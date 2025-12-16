// Firebase REST API for server-side use (Cloudflare Workers / Edge compatible)
// Using REST API instead of SDK to avoid browser-specific dependencies

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// Helper to sanitize email for use as document ID
export function emailToDocId(email: string): string {
  return email.toLowerCase().trim().replace(/[.#$[\]/]/g, '_');
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
      const url = `${FIRESTORE_BASE_URL}/${collection}/${docId}?key=${FIREBASE_API_KEY}`;
      const response = await fetch(url);

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
      const url = `${FIRESTORE_BASE_URL}/${collection}/${docId}?key=${FIREBASE_API_KEY}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
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
