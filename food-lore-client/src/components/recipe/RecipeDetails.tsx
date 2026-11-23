'use client';

import { useEffect, useState } from 'react';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null;
};

type Props = {
  meal: Meal;
  ingredients: string[];
};

export default function RecipeDetails({
  meal,
  ingredients,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    const alreadySaved = savedFavorites.some(
      (favorite: any) => favorite.id === meal.idMeal
    );

    setIsFavorite(alreadySaved);
  }, [meal.idMeal]);

  function handleFavorite() {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    const alreadySaved = savedFavorites.some(
      (favorite: any) => favorite.id === meal.idMeal
    );

    let updatedFavorites;

    if (alreadySaved) {
      updatedFavorites = savedFavorites.filter(
        (favorite: any) => favorite.id !== meal.idMeal
      );
    } else {
      updatedFavorites = [
        ...savedFavorites,
        {
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          tag: meal.strCategory ?? 'Recipe',
          cuisine: meal.strArea ?? 'Unknown cuisine',
        },
      ];
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(!alreadySaved);
  }

  return (
    <div className="foodlore-app recipe-page">
      <main className="recipe-page-shell">
        <a className="recipe-backlink" href="/">
          ← Back to recipes
        </a>

        <section className="recipe-hero">
          <div className="recipe-meta-panel">
            <p className="recipe-kicker">
              {meal.strCategory?.toUpperCase()}
            </p>

            <h1 className="recipe-title">
              {meal.strMeal}
            </h1>

            <p className="recipe-summary">
              {meal.strArea
                ? `${meal.strArea} cuisine`
                : 'A Food Lore recipe'}
            </p>

            <div className="recipe-tag-row">
              {meal.strCategory && (
                <span className="recipe-tag-pill">
                  {meal.strCategory}
                </span>
              )}

              {meal.strArea && (
                <span className="recipe-tag-pill">
                  {meal.strArea}
                </span>
              )}
            </div>

            <div className="recipe-actions">
              <button
                type="button"
                className="recipe-button primary"
                onClick={handleFavorite}
              >
                {isFavorite ? '♥ Saved' : '♡ Save recipe'}
              </button>
            </div>
          </div>

          <div className="recipe-visual-card">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </div>
        </section>

        <div className="recipe-content">
          <aside className="recipe-sidebar">
            <div className="recipe-card-panel ingredients-card">
              <div className="ingredients-head">
                <h3>What you&apos;ll need</h3>
                <span className="ingredients-count">
                  {ingredients.length}
                </span>
              </div>

              <div className="ingredients-list">
                {ingredients.map((ingredient) => (
                  <label key={ingredient} className="ingredient-check-row">
                    <input type="checkbox" />
                    <span>{ingredient}</span>
                  </label>
                ))}
              </div>

            </div>
          </aside>

          <section className="recipe-steps-panel">
            <div className="steps-header">
              <h2>Let&apos;s make it</h2>
            </div>

            <div className="instructions-card">
              <p>{meal.strInstructions}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}