import { useClerk } from '../lib/useClerk';

/**
 * Wraps content that requires authentication.
 * 'beginner' difficulty is always free.
 * 'intermediate' and 'advanced' require a free account.
 */
export default function AuthGate({ difficulty, children }) {
  const { isLoaded, isSignedIn, clerkAvailable, openSignIn } = useClerk();
  const isFree = difficulty === 'beginner';

  // No Clerk configured — show everything
  if (!clerkAvailable) return children;

  // Free tier — no auth needed
  if (isFree) return children;

  // Signed in — show content
  if (isLoaded && isSignedIn) return children;

  // Not yet loaded — avoid flash
  if (!isLoaded) return null;

  return (
    <div className="auth-gate">
      <div className="auth-gate-icon">🔒</div>
      <h2 className="auth-gate-title">Free Account Required</h2>
      <p className="auth-gate-desc">
        <strong>{difficulty === 'advanced' ? 'Advanced' : 'Intermediate'}</strong> games are
        unlocked with a free Chess Masters account — no payment required, ever.
      </p>
      <div className="auth-gate-actions">
        <button className="btn-chess-secondary" onClick={openSignIn}>Sign in</button>
        <button className="btn-chess-primary" onClick={openSignIn}>Create free account</button>
      </div>
      <p className="auth-gate-note">Beginner games are always free — no account needed.</p>
    </div>
  );
}
