import type { ReactNode } from 'react';
import './auth.css';

type AuthLayoutProps = {
  children: ReactNode;
  currentPage: 'login' | 'signup';
  onLoginClick?: () => void;
  onSignupClick?: () => void;
};

export default function AuthLayout({ children, currentPage, onLoginClick, onSignupClick }: AuthLayoutProps) {
  return (
    <div className="fl-auth">
      <header className="fl-header">
        <a className="fl-logo" href="/" aria-label="Food Lore home"><span className="fl-sprout" aria-hidden="true">♧</span> food lore.</a>
        <nav className="fl-primary-nav" aria-label="Main navigation">
          <a href="/recipes">Explore recipes</a>
          <a href="/recipes/new">Post a recipe</a>
        </nav>
        <nav className="fl-account-nav" aria-label="Account navigation">
          <button type="button" className={currentPage === 'login' ? 'fl-text-button fl-current' : 'fl-text-button'} onClick={onLoginClick} aria-current={currentPage === 'login' ? 'page' : undefined}>Log in</button>
          <button type="button" className="fl-nav-cta" onClick={onSignupClick}>Join the table</button>
        </nav>
      </header>

      <main className="fl-main">
        <section className="fl-photo-panel" aria-label="Food shared around a table">
          <div className="fl-photo-badge">♧ &nbsp; Your seat at the table</div>
          <div className="fl-photo-copy">
            <h2>Good food starts with a little confidence.</h2>
            <p>Find your next easy dinner. Share your first kitchen win. Learn a little from each other.</p>
            <div className="fl-photo-caption"><span>Real student recipes</span><span>No fancy skills needed</span></div>
          </div>
        </section>
        <section className="fl-form-column">{children}</section>
      </main>
      <footer className="fl-footer">
        <div><strong>food lore.</strong><p>Good food. A little know-how. Your kind of people.</p></div>
        <span>Made for everyday cooks · © 2026 Food Lore</span>
      </footer>
    </div>
  );
}
