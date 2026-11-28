'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './edit.css';

type User = {
  id: string;
  displayName: string;
  username: string;
  email: string;
};

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();

        setUser(data.user);
        setDisplayName(data.user.displayName);
        setUsername(data.user.username);
        setEmail(data.user.email);
      } catch (error) {
        console.error('Could not load user:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName,
          username,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Could not update profile.');
        return;
      }

      router.push('/profile');
      router.refresh();
    } catch (error) {
      console.error('Could not update profile:', error);
      setError('Could not update profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="edit-profile-page">
        <div className="edit-profile-shell">
        <Link href="/profile" className="edit-back-link">
            ← Back to profile
        </Link>

        <section className="edit-profile-card">
            <div className="edit-profile-heading">
            <p className="edit-profile-eyebrow">ACCOUNT SETTINGS</p>
            <h1>Edit profile</h1>
            <p>Update how your profile appears across Food Lore.</p>
            </div>

            <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label className="edit-field">
                <span>Display name</span>
                <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                />
            </label>

            <label className="edit-field">
                <span>Username</span>
                <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />
            </label>

            <label className="edit-field">
                <span>Email</span>
                <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </label>

            {error && (
                <p className="edit-profile-error">
                {error}
                </p>
            )}

            <div className="edit-profile-actions">
                <Link href="/profile" className="edit-cancel-btn">
                Cancel
                </Link>

                <button
                type="submit"
                className="edit-save-btn"
                disabled={saving}
                >
                {saving ? 'Saving...' : 'Save changes'}
                </button>
            </div>
            </form>
        </section>
        </div>
    </main>
    );
}