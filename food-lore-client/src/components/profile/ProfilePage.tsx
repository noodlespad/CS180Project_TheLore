'use client';

import { useEffect, useState } from 'react';

import Link from "next/dist/client/link";
import { useRouter } from 'next/navigation';

type ProfileRecipe = {
  id: number;
  title: string;
  description: string;
  time: string;
  level: string;
  tag: string;
  image: string;
  comments: number;
};

type User = {
  id: string;
  displayName: string;
  username: string;
  email: string;
};


export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [activeTab, setActiveTab] =
    useState<'my' | 'saved' | 'drafts'>('my');

  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Could not log out:', error);
    }
  }

  // Load logged-in user
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Could not load profile user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Load favorite IDs from Neon
  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch('/api/favorites');

        console.log('favorites response status:', response.status);

        const data = await response.json();

        console.log('favorites response data:', data);

        if (!response.ok) {
          setFavoriteIds([]);
          return;
        }

        setFavoriteIds(data.favorites ?? []);
      } catch (error) {
        console.error('Could not load favorites:', error);
        setFavoriteIds([]);
      }
    }

    loadFavorites();
  }, []);

  // Load recipe details for saved IDs
useEffect(() => {
  async function loadSavedRecipes() {
    console.log('favoriteIds:', favoriteIds);

    if (favoriteIds.length === 0) {
      setSavedRecipes([]);
      return;
    }

    try {
      const results = await Promise.all(
        favoriteIds.map(async (id) => {
          console.log('loading MealDB recipe:', id);

          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );

          if (!response.ok) {
            console.error('MealDB failed for:', id);
            return null;
          }

          const data = await response.json();

          return data.meals?.[0] ?? null;
        })
      );

      console.log('saved recipe results:', results);

      setSavedRecipes(results.filter(Boolean));
    } catch (error) {
      console.error('Could not load saved recipes:', error);
      setSavedRecipes([]);
    }
  }

  loadSavedRecipes();
}, [favoriteIds]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>You need to log in to view your profile.</div>;
  }

  return (
    <div className="foodlore-app">
      <header className="foodlore-header">
        <div className="brand-group">
          <span className="brand-mark" aria-hidden="true">
            ♡
          </span>
          <span className="brand-name">food lore.</span>
        </div>

        <nav className="top-nav" aria-label="Main navigation">
          <Link href="/">Explore recipes</Link>
          <Link href="/favorites">Saved recipes</Link>
          <Link href="/cart">Shopping List</Link>
          <Link href="/recipes/new">Post a recipe</Link>
        </nav>

        <div className="profile-user">
          <span>Hi, {user.displayName}</span>
          <span className="header-avatar">
            {user.displayName
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <span className="profile-chevron">⌄</span>
        </div>
      </header>

      <main className="profile-shell">
        <div className="profile-toolbar">
          <span className="profile-eyebrow">YOUR KITCHEN CORNER</span>

          <div className="profile-links">
            <a href="#">Account settings</a>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>

        <section className="profile-card">
          <div className="profile-avatar">
            <span className="profile-avatar">
              {user.displayName
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>

          <div className="profile-details">
            <div className="profile-name">
              <h1>{user.displayName}</h1>
              <span>@{user.username}</span>
            </div>

            <span className="profile-member">
              At the table since September 2026
            </span>
          </div>

          <button className="edit-profile-button" type="button">
            ✎ Edit profile
          </button>
        </section>

        <section className="profile-stats">
          <article className="stat-card">
            <span className="stat-icon">⌯⌲</span>

            <div>
              <strong>3</strong>
              <p>Recipes shared</p>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon">✎</span>

            <div>
              <strong>23</strong>
              <p>Comments on your recipes</p>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon">♡</span>

            <div>
              <strong>{favoriteIds.length}</strong>
              <p>Recipes saved</p>
            </div>
          </article>
        </section>

        <section className="profile-recipes">
          <div className="profile-tabs-row">
            <div className="profile-tabs">
              <button
                className={activeTab === 'my' ? 'profile-tab active' : 'profile-tab'}
                type="button"
                onClick={() => setActiveTab('my')}
              >
                My recipes
              </button>

              <button
                className={activeTab === 'saved' ? 'profile-tab active' : 'profile-tab'}
                type="button"
                onClick={() => setActiveTab('saved')}
              >
                Saved recipes ({favoriteIds.length})
              </button>

              <button
                className={activeTab === 'drafts' ? 'profile-tab active' : 'profile-tab'}
                type="button"
                onClick={() => setActiveTab('drafts')}
              >
                Drafts
              </button>

              <button className="profile-tab" type="button">
                Drafts (1)
              </button>
            </div>

            <button className="post-recipe-button" type="button">
              + Post a recipe
            </button>
          </div>

          <div className="profile-section-heading">
            <h2>A few good meals, from your kitchen.</h2>

            <p>
              Your recipes are helping someone else find their feet. Keep the
              good food coming.
            </p>
          </div>

          {activeTab === 'saved' && (
            <div className="profile-recipe-grid">
              {savedRecipes.length === 0 ? (
                <p>No saved recipes yet.</p>
              ) : (
                savedRecipes.map((recipe) => (
                  <Link
                    key={recipe.idMeal}
                    href={`/recipes/${recipe.idMeal}`}
                    className="recipe-card-link"
                  >
                    <article className="profile-recipe-card">
                      <div className="profile-recipe-image">
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                        />

                        <span className="profile-recipe-tag">
                          {recipe.strCategory}
                        </span>
                      </div>

                      <div className="profile-recipe-body">
                        <h3>{recipe.strMeal}</h3>

                        <div className="profile-recipe-meta">
                          <span>{recipe.strCategory}</span>
                          {recipe.strArea && <span>{recipe.strArea}</span>}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              )}
            </div>
          )}

          <div className="draft-card">
            <div className="draft-info">
              <span className="draft-icon">✎</span>

              <div>
                <strong>A good idea is waiting in your drafts.</strong>
                <p>
                  Garlic butter study-break noodles · Last saved just now
                </p>
              </div>
            </div>

            <button type="button" className="continue-button">
              Continue recipe →
            </button>
          </div>
        </section>
      </main>

      <footer className="profile-footer">
        <div>
          <strong>food lore.</strong>
          <p>Good food. A little know-how. Your kind of people.</p>
        </div>

        <span>Made for everyday cooks • © 2026 Food Lore</span>
      </footer>
    </div>
  );
}
