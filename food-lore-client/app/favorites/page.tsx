'use client';

import Link from 'next/link';
import './favorites.css';
import { useEffect, useState } from 'react';

type Recipe = {
  id: string;
  title: string;
  image: string;
  tag: string;
  cuisine: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    setFavorites(savedFavorites);
  }, []);

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <Link href="/">← Back to recipes</Link>

        <p className="eyebrow">YOUR SAVED RECIPES</p>
        <h1>Favorites</h1>
        <p>Recipes you love, all in one place.</p>
      </header>

      <section className="favorites-content">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <span className="heart-icon">♡</span>

            <h2>No favorites yet</h2>

            <p>
              Save recipes you want to come back to and
              they&apos;ll appear here.
            </p>

            <Link href="/" className="dark-btn">
              Explore recipes
            </Link>
          </div>
        ) : (
          <div className="recipe-grid">
            {favorites.map((recipe) => (
              <article key={recipe.id} className="recipe-card">
                <div className="recipe-photo">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                  />

                  <span className="recipe-tag">
                    {recipe.tag}
                  </span>
                </div>

                <div className="recipe-info">
                  <h3>{recipe.title}</h3>

                  <div className="recipe-meta">
                    <span>{recipe.tag}</span>

                    {recipe.cuisine !== 'Unknown cuisine' && (
                      <span>{recipe.cuisine}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}