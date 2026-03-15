/**
 * Thin React hook wrapping Clerk's vanilla JS SDK (loaded via CDN).
 * Falls back gracefully when no Clerk publishable key is configured.
 */
import { useState, useEffect, useCallback } from 'react';

function getClerk() {
  return typeof window !== 'undefined' ? window.Clerk : null;
}

export function useClerk() {
  const [state, setState] = useState({
    isLoaded: false,
    isSignedIn: false,
    user: null,
    clerkAvailable: false,
  });

  useEffect(() => {
    const clerk = getClerk();
    if (!clerk) {
      // No Clerk configured — treat as always loaded, not signed in
      setState({ isLoaded: true, isSignedIn: false, user: null, clerkAvailable: false });
      return;
    }

    const sync = () => {
      setState({
        isLoaded: true,
        isSignedIn: !!clerk.user,
        user: clerk.user || null,
        clerkAvailable: true,
      });
    };

    if (clerk.loaded) {
      sync();
    } else {
      clerk.load().then(sync).catch(() => {
        setState({ isLoaded: true, isSignedIn: false, user: null, clerkAvailable: false });
      });
    }

    // Re-sync on auth state changes
    clerk.addListener?.(() => sync());
  }, []);

  const openSignIn = useCallback(() => {
    getClerk()?.openSignIn?.({});
  }, []);

  const openUserProfile = useCallback(() => {
    getClerk()?.openUserProfile?.({});
  }, []);

  const signOut = useCallback(async () => {
    await getClerk()?.signOut?.();
    setState(s => ({ ...s, isSignedIn: false, user: null }));
  }, []);

  return { ...state, openSignIn, openUserProfile, signOut };
}
