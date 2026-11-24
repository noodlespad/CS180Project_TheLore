'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './favorites.css';

type SavedRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string | null;
  strArea: string | null;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        // 1. Get saved MealDB IDs from Neon
        const response = await fetch('/api/favorites');

        if (!response.ok) {
          setFavorites([]);
          return;
        }

        const data = await response.json();

        const ids: string[] = data.favorites ?? [];

        // 2. Get recipe details from MealDB
        const results = await Promise.all(
          ids.map(async (id) => {
            const mealResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            if (!mealResponse.ok) {
              return null;
            }

            const mealData = await mealResponse.json();

            return mealData.meals?.[0] ?? null;
          })
        );

        setFavorites(
          results.filter(
            (recipe): recipe is SavedRecipe => recipe !== null
          )
        );
      } catch (error) {
        console.error('Could not load favorites page:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  if (loading) {
    return <div>Loading favorites...</div>;
  }

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
              <Link
                key={recipe.idMeal}
                href={`/recipes/${recipe.idMeal}`}
                className="recipe-card-link"
              >
                <article className="recipe-card">
                  <div className="recipe-photo">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                    />

                    {recipe.strCategory && (
                      <span className="recipe-tag">
                        {recipe.strCategory}
                      </span>
                    )}
                  </div>

                  <div className="recipe-info">
                    <h3>{recipe.strMeal}</h3>

                    <div className="recipe-meta">
                      {recipe.strCategory && (
                        <span>{recipe.strCategory}</span>
                      )}

                      {recipe.strArea && (
                        <span>{recipe.strArea}</span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}