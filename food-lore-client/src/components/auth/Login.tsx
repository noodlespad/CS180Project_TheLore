"use client";
import { useState, type FormEvent } from 'react';
import AuthLayout from './AuthLayout';

export type LoginValues = { email: string; password: string; rememberMe: boolean };
export type LoginProps = {
  onLogin?: (values: LoginValues) => void | Promise<void>;
  onSignupClick?: () => void;
  onForgotPasswordClick?: () => void;
};

export default function Login({ onLogin, onSignupClick, onForgotPasswordClick }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!onLogin) {
      setError('Login is not connected yet. Ask your team to connect the authentication service.');
      return;
    }
    setBusy(true);
    try {
      await onLogin({ email: email.trim(), password, rememberMe });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout currentPage="login" onSignupClick={onSignupClick} onLoginClick={() => undefined}>
      <div className="fl-form-inner">
        <p className="fl-eyebrow">GOOD TO HAVE YOU BACK</p>
        <h1>Welcome to the<br />table.</h1>
        <p className="fl-description">Log in to save your favorites, share recipes, and swap tips with other everyday cooks.</p>
        <form onSubmit={handleSubmit}>
          <label className="fl-label" htmlFor="fl-login-email">Email address</label>
          <input id="fl-login-email" type="email" autoComplete="email" placeholder="maya@university.edu" value={email} onChange={e => setEmail(e.target.value)} required />
          <label className="fl-label" htmlFor="fl-login-password">Password</label>
          <div className="fl-password-wrap">
            <input id="fl-login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="fl-eye" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <div className="fl-options-row">
            <label className="fl-checkbox"><input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} /> Keep me logged in</label>
            <button className="fl-link-button" type="button" onClick={onForgotPasswordClick}>Forgot password?</button>
          </div>
          {error && <p role="alert" className="fl-error">{error}</p>}
          <button className="fl-submit" type="submit" disabled={busy}>{busy ? 'Logging in…' : '→   Log in'}</button>
        </form>
        <p className="fl-switch">New around here? <button type="button" className="fl-link-button" onClick={onSignupClick}>Create an account</button></p>
        <div className="fl-explore"><span>Just looking for dinner? You're welcome here too.</span><a href="/recipes">Explore recipes without an account →</a></div>
      </div>
    </AuthLayout>
  );
}
