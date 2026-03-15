import { useState, useEffect } from 'react';
import { useClerk } from '../lib/useClerk';

export default function AuthButton() {
  const { isLoaded, isSignedIn, user, openSignIn, openUserProfile, signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <div className="auth-user-btn" style={{ position: 'relative' }}>
        <button
          className="auth-avatar-btn"
          onClick={() => setMenuOpen(o => !o)}
          title={user?.primaryEmailAddress?.emailAddress || 'Account'}
        >
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="avatar" className="auth-avatar-img" />
          ) : (
            <span className="auth-avatar-fallback">
              {(user?.firstName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || '?').toUpperCase()}
            </span>
          )}
        </button>
        {menuOpen && (
          <>
            <div className="auth-menu-overlay" onClick={() => setMenuOpen(false)} />
            <div className="auth-menu">
              <button className="auth-menu-item" onClick={() => { openUserProfile(); setMenuOpen(false); }}>
                Manage account
              </button>
              <button className="auth-menu-item auth-menu-item-danger" onClick={() => { signOut(); setMenuOpen(false); }}>
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="auth-btn-group">
      <button className="btn-chess-secondary auth-btn-sm" onClick={openSignIn}>
        Sign in
      </button>
      <button className="btn-chess-primary auth-btn-sm" onClick={openSignIn}>
        Join free
      </button>
    </div>
  );
}
