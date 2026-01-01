// Firebase REST API with Service Account Auth (Cloudflare Workers / Edge compatible)
// Uses service account credentials to bypass security rules

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.FIREBASE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_PRIVATE_KEY = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// Cache for access token
let cachedToken: { token: string; expiresAt: number } | null = null;

// Helper to sanitize email for use as document ID
export function emailToDocId(email: string): string {
  return email.toLowerCase().trim().replace(/[.#$[\]/]/g, '_');
}

// Base64URL encode (Web Crypto compatible)
function base64UrlEncode(data: Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof data === 'string') {
    bytes = new TextEncoder().encode(data);
  } else {
    bytes = data;
  }

  // Convert to base64 using array approach (works with binary data)
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  const len = bytes.length;

  for (let i = 0; i < len; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < len ? bytes[i + 1] : 0;
    const b3 = i + 2 < len ? bytes[i + 2] : 0;

    result += base64Chars[b1 >> 2];
    result += base64Chars[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < len ? base64Chars[((b2 & 15) << 2) | (b3 >> 6)] : '';
    result += i + 2 < len ? base64Chars[b3 & 63] : '';
  }

  // Convert to base64url (no padding)
  return result.replace(/\+/g, '-').replace(/\//g, '_');
}

// Generate JWT for service account
async function createServiceAccountJWT(): Promise<string> {
  if (!SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error('Service account credentials not configured');
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // 1 hour

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: SERVICE_ACCOUNT_EMAIL,
    sub: SERVICE_ACCOUNT_EMAIL,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: exp,
    scope: 'https://www.googleapis.com/auth/datastore',
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  // Import private key for signing
  const pemContents = SERVICE_ACCOUNT_PRIVATE_KEY
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  // Decode base64 without atob (works in Workers)
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const base64Lookup = new Uint8Array(128);
  for (let i = 0; i < base64Chars.length; i++) {
    base64Lookup[base64Chars.charCodeAt(i)] = i;
  }

  // Calculate correct output length accounting for padding
  let padding = 0;
  const len = pemContents.length;
  if (len > 0 && pemContents[len - 1] === '=') padding++;
  if (len > 1 && pemContents[len - 2] === '=') padding++;
  const outputLen = (len * 3 / 4) - padding;
  const binaryKey = new Uint8Array(outputLen);

  let j = 0;
  for (let i = 0; i < len; i += 4) {
    const a = base64Lookup[pemContents.charCodeAt(i)];
    const b = base64Lookup[pemContents.charCodeAt(i + 1)];
    const c = base64Lookup[pemContents.charCodeAt(i + 2)];
    const d = base64Lookup[pemContents.charCodeAt(i + 3)];
    binaryKey[j++] = (a << 2) | (b >> 4);
    if (j < outputLen) binaryKey[j++] = ((b & 15) << 4) | (c >> 2);
    if (j < outputLen) binaryKey[j++] = ((c & 3) << 6) | d;
  }

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signatureInput)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  return `${signatureInput}.${encodedSignature}`;
}

// Get OAuth2 access token from JWT
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const jwt = await createServiceAccountJWT();

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to get access token:', error);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();

  // Cache the token
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000, // Subtract 60s for safety
  };

  return data.access_token;
}

// Convert JS object to Firestore document format
function toFirestoreValue(value: unknown): Record<string, unknown> {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }
  if (typeof value === 'string') {
    return { stringValue: value };
  }
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return { integerValue: value.toString() };
    }
    return { doubleValue: value };
  }
  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }
  if (value instanceof Date) {
    return { timestampValue: value.toISOString() };
  }
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(toFirestoreValue),
      },
    };
  }
  if (typeof value === 'object') {
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

// Convert JS object to Firestore fields format
function toFirestoreFields(data: Record<string, unknown>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === '__SERVER_TIMESTAMP__') {
      // Use current time for server timestamp
      fields[key] = { timestampValue: new Date().toISOString() };
    } else {
      fields[key] = toFirestoreValue(value);
    }
  }
  return fields;
}

// Convert Firestore document to JS object
function fromFirestoreFields(fields: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = fromFirestoreValue(value as Record<string, unknown>);
  }
  return result;
}

function fromFirestoreValue(value: Record<string, unknown>): unknown {
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return parseInt(value.integerValue as string, 10);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return new Date(value.timestampValue as string);
  if ('arrayValue' in value) {
    const arr = value.arrayValue as { values?: unknown[] };
    return (arr.values || []).map((v) => fromFirestoreValue(v as Record<string, unknown>));
  }
  if ('mapValue' in value) {
    const map = value.mapValue as { fields?: Record<string, unknown> };
    return fromFirestoreFields(map.fields || {});
  }
  return null;
}

export const firestore = {
  // Get a document by path
  async getDoc(collection: string, docId: string): Promise<{ exists: boolean; data: Record<string, unknown> | null }> {
    try {
      const accessToken = await getAccessToken();
      const url = `${FIRESTORE_BASE_URL}/${collection}/${docId}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status === 404) {
        return { exists: false, data: null };
      }

      if (!response.ok) {
        console.error('Firestore getDoc error:', await response.text());
        return { exists: false, data: null };
      }

      const doc = await response.json();
      return {
        exists: true,
        data: doc.fields ? fromFirestoreFields(doc.fields) : null,
      };
    } catch (error) {
      console.error('Firestore getDoc error:', error);
      return { exists: false, data: null };
    }
  },

  // Set (create or overwrite) a document
  async setDoc(collection: string, docId: string, data: Record<string, unknown>): Promise<boolean> {
    try {
      const accessToken = await getAccessToken();
      const url = `${FIRESTORE_BASE_URL}/${collection}/${docId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fields: toFirestoreFields(data),
        }),
      });

      if (!response.ok) {
        console.error('Firestore setDoc error:', await response.text());
        return false;
      }

      return true;
    } catch (error) {
      console.error('Firestore setDoc error:', error);
      return false;
    }
  },
};

// Server timestamp placeholder
export const serverTimestamp = () => '__SERVER_TIMESTAMP__';
