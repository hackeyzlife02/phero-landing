'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/hooks';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

export function OnboardingHeader() {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;

    const fetchStylistInfo = async () => {
      if (!user || !db) return;

      try {
        // Wait for ID token to ensure auth is fully propagated
        await user.getIdToken();

        // Get data from stylists collection
        const stylistRef = doc(db, 'stylists', user.uid);
        const stylistSnap = await getDoc(stylistRef);

        if (stylistSnap.exists()) {
          const data = stylistSnap.data();
          const fullName = data.name || '';
          // Parse location from hometown field
          const hometown = data.hometown || '';

          setName(fullName);
          setLocation(hometown);
        }
      } catch (error) {
        console.error('Error fetching stylist info:', error);
      }
    };

    fetchStylistInfo();
  }, [user, authLoading]);

  if (!name && !location) {
    return null;
  }

  return (
    <div className="flex items-center justify-between text-sm text-white/60 mb-4">
      <span>{name}</span>
      <span>{location}</span>
    </div>
  );
}
