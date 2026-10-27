"use client";
import { useState, type FormEvent } from 'react';
import AuthLayout from './AuthLayout';

export type SignupValues = { displayName: string; username: string; email: string; password: string };
export type SignupProps = {
  onSignup?: (values: SignupValues) => void | Promise<void>;
  onLoginClick?: () => void;
};

export default function Signup({ onSignup, onLoginClick }: SignupProps) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) {
      setError('Username must be 3–24 characters using letters, numbers, or underscores.');
      return;
    }
    if (password.length < 8 || !/\d/.test(password)) {
      setError('Password must have at least 8 characters and one number.');
      return;
    }
    if (password !== confirmation) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please agree to the terms to create an account.'); return; }
    if (!onSignup) { setError('Sign-up is not connected yet. Ask your team to connect the authentication service.'); return; }
    setBusy(true);
    try {
      await onSignup({ displayName: displayName.trim(), username, email: email.trim(), password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create an account. Please try again.');
    } finally { setBusy(false); }
  }

  return (
    <AuthLayout currentPage="signup" onSignupClick={() => undefined} onLoginClick={onLoginClick}>
      <div className="fl-form-inner fl-signup-form">
        <p className="fl-eyebrow">THERE'S ROOM FOR YOU HERE</p>
        <h1>Join the table.</h1>
        <p className="fl-description">Your kitchen journey starts here. Create a free account to post recipes, save meals, and share tips.</p>
        <form onSubmit={handleSubmit}>
          <label className="fl-label" htmlFor="fl-signup-name">Display name</label>
          <input id="fl-signup-name" value={displayName} onChange={e => setDisplayName(e.target.value)} autoComplete="name" placeholder="Maya Chen" required />
          <label className="fl-label" htmlFor="fl-signup-username">Username</label>
          <input id="fl-signup-username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" placeholder="mayacooks" minLength={3} maxLength={24} required />
          <p className="fl-hint">This is how your community will find you.</p>
          <label className="fl-label" htmlFor="fl-signup-email">Email address</label>
          <input id="fl-signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="maya@university.edu" required />
          <label className="fl-label" htmlFor="fl-signup-password">Password</label>
          <div className="fl-password-wrap">
            <input id="fl-signup-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" placeholder="Create a password" required />
            <button className="fl-eye" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <p className="fl-hint">Use at least 8 characters, including a number.</p>
          <label className="fl-label" htmlFor="fl-signup-confirm">Confirm password</label>
          <input id="fl-signup-confirm" type={showPassword ? 'text' : 'password'} value={confirmation} onChange={e => setConfirmation(e.target.value)} autoComplete="new-password" placeholder="Confirm your password" required />
          <label className="fl-checkbox fl-terms"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required /> <span>I agree to the Terms of Use and Privacy Policy. I'll keep the table friendly and respectful.</span></label>
          {error && <p role="alert" className="fl-error">{error}</p>}
          <button className="fl-submit" type="submit" disabled={busy}>{busy ? 'Creating account…' : '→   Create my account'}</button>
        </form>
        <p className="fl-switch">Already part of the community? <button type="button" className="fl-link-button" onClick={onLoginClick}>Log in</button></p>
      </div>
    </AuthLayout>
  );
}
