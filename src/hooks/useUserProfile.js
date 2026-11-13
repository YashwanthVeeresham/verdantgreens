import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PROFILE, DEMO_PROFILE, PROFILE_STORAGE_KEY } from '../constants/config';

const readStoredProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fall through to demo profile
  }
  return DEMO_PROFILE;
};

export function useUserProfile() {
  const [profile, setProfile] = useState(readStoredProfile);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (!savedFeedback) return undefined;
    const t = setTimeout(() => setSavedFeedback(false), 3000);
    return () => clearTimeout(t);
  }, [savedFeedback]);

  const updateProfile = useCallback((patch) => setProfile((prev) => ({ ...prev, ...patch })), []);

  const saveProfile = useCallback(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    setSavedFeedback(true);
  }, [profile]);

  const signIn = useCallback(
    ({ name, email, phone, remember, isNew }) => {
      const next = {
        ...profile,
        name: name.trim() || (email ? email.split('@')[0] : profile.name),
        email: email.trim() || profile.email,
        phone: phone.trim() || profile.phone,
        memberTier: isNew ? 'New Harvest Member' : 'Greenhouse Resident (Daily Harvest)'
      };
      setProfile(next);
      if (remember) localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      return next;
    },
    [profile]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    setProfile(DEFAULT_PROFILE);
  }, []);

  return { profile, updateProfile, saveProfile, savedFeedback, signIn, signOut };
}
