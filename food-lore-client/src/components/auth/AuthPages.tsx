import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

/** Standalone switcher for teams not yet using a router. */
export default function AuthPages() {
  const [page, setPage] = useState<'login' | 'signup'>('login');
  return page === 'login'
    ? <Login onSignupClick={() => setPage('signup')} />
    : <Signup onLoginClick={() => setPage('login')} />;
}
