'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Recipe = {
  id: string;
  title: string;
  time: string;
  level: string;
  author: string;
  tag: string;
  image: string;
  saves: number;
  cuisine: string;
};

const filterPills = ['All recipes', 'Breakfast', 'Seafood', 'Chicken', 'Dessert', 'Vegetarian'];
const kitchenIngredients = ['Eggs', 'Rice', 'Pasta', 'Spinach', 'Beans', 'Cheese'];

export default function HomePage() {
const [query, setQuery] = useState('');
const [recipes, setRecipes] = useState<Recipe[]>([]);
const [activeFilter, setActiveFilter] = useState<string | null>('All recipes');
const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
const [user, setUser] = useState<any>(null);

  useEffect(() => {
  async function loadFavorites() {
    try {
      const response = await fetch('/api/favorites');

      if (!response.ok) {
        setFavoriteIds([]);
        return;
      }

      const data = await response.json();

      setFavoriteIds(
        (data.favorites ?? []).map((id: string) => String(id))
      );
    } catch (error) {
      console.error('Could not load favorites:', error);
      setFavoriteIds([]);
    }
  }

  loadFavorites();
  }, []);

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
      } catch {
        setUser(null);
      }
    }

    loadUser();
  }, []);

  async function handleCategory(category: string) {
  setActiveFilter(category);
  setSelectedIngredient(null);

  if (category === 'All recipes') {
    return;
  }

  const response = await fetch(
    `/api/recipes/search?category=${encodeURIComponent(category)}`
  );

  const data = await response.json();

  setRecipes(
    data.recipes.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      tag: recipe.category ?? category,
      cuisine: recipe.cuisine ?? 'Unknown cuisine',
    }))
  );
}

  async function handleSearch(searchValue = query) {
  if (!searchValue.trim()) return;

  const response = await fetch(
    `/api/recipes/search?q=${encodeURIComponent(searchValue)}`
  );

  const data = await response.json();

  setRecipes(
    data.recipes.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      tag: recipe.category ?? 'Recipe',
      cuisine: recipe.cuisine ?? 'Unknown cuisine',
    }))
  );
}

  async function handleIngredientSearch(ingredient: string) {
  const response = await fetch(
    `/api/recipes/search?ingredient=${encodeURIComponent(ingredient)}`
  );

  const data = await response.json();

  setRecipes(
    data.recipes.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      tag: recipe.category ?? 'Recipe',
      cuisine: recipe.cuisine ?? 'Unknown cuisine',
    }))
  );
}

  const visibleRecipes = useMemo(() => {
    return [...recipes].sort((a, b) => {
      if (sortOrder === 'az') {
        return a.title.localeCompare(b.title);
      }

      return b.title.localeCompare(a.title);
    });
  }, [recipes, sortOrder]);
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    setFavoriteIds(
      savedFavorites.map((recipe: any) => recipe.id)
    );
  }, []);

async function handleFavorite(recipeId: string) {
  const id = String(recipeId);
  const alreadySaved = favoriteIds.includes(recipeId);

  try {
    const response = await fetch('/api/favorites', {
      method: alreadySaved ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mealdbId: recipeId,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Favorite failed:', data);
      return;
    }

    setFavoriteIds((current) =>
      alreadySaved
        ? current.filter((id) => id !== recipeId)
        : [...current, recipeId]
    );
  } catch (error) {
    console.error('Could not update favorite:', error);
  }
}

  return (
    <div className="foodlore-app">
      <header className="foodlore-header">
        <div className="brand-group">
          <span className="brand-mark" aria-hidden="true">
            ♡
          </span>
          <span className="brand-name">
            <Link href="/">food lore.</Link>
          </span>
        </div>

        <nav className="top-nav" aria-label="Main navigation">
          <Link href="/">Explore recipes</Link>
          <Link href="/favorites">Saved recipes</Link>
          <Link href="/cart">Shopping List</Link>
          <Link href="/recipes/new">Post a recipe</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <Link href="/profile" className="profile-header-link">
              <span className="mini-user">
                Hi, {user.displayName}
              </span>

              <span className="panel-avatar">
                {user.displayName
                  .split(' ')
                  .map((part: string) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="ghost-btn">
                Log in
              </Link>

              <Link href="/signup" className="dark-btn">
                Join the table
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="foodlore-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">A LITTLE INSPIRATION. A REALLY GOOD MEAL.</p>
            <h1>What&apos;s cooking between classes?</h1>
            <p className="hero-subtitle">
              Simple recipes, everyday ingredients, and a community learning along with you.
            </p>

            <div className="search-box">
              <span className="search-mark" aria-hidden="true">
                ⌕
              </span>
              <input
                type="text"
                placeholder="Search a recipe or ingredient..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch();
                  }
                }}
                aria-label="Search recipes"
              />
              <button type="button" onClick={() => handleSearch()}>
                Find recipes
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
              alt="Pasta"
            />
           <div className="image-callout">
            <span className="mini-label">FOOD LORE.</span>
            <span className="mini-text">Find something delicious today.</span>
          </div>
          </div>
        </section>

        <section className="catalog-layout">
          <aside className="sidebar">
            <h2>Find your next meal</h2>

            <div className="side-group">
              <h3>What&apos;s in your kitchen?</h3>
              <div className="chip-list">
                {kitchenIngredients.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={selectedIngredient === item ? 'chip active' : 'chip'}
                    onClick={() => {
                      if (selectedIngredient === item) {
                        setSelectedIngredient(null);
                      } else {
                        setSelectedIngredient(item);
                        setActiveFilter('All recipes');
                        handleIngredientSearch(item);
                      }
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="kitchen-tip">
              <div className="tip-icon">⌂</div>
              <div className="tip-copy">
                <h4>New to the kitchen?</h4>
                <p>You&apos;re in good company. Every recipe has clear steps, with helpful tips to keep it fun.</p>
              </div>
            </div>
          </aside>

          <div className="recipe-panel">
            <div className="recipe-head">
              <div className="head-copy">
                <h2>Little effort. Big flavor.</h2>
                <span>{visibleRecipes.length} recipes found</span>
              </div>

              <select
                className="sort-btn"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value as 'az' | 'za')
                }
              >
                <option value="az">Sort: A–Z</option>
                <option value="za">Sort: Z–A</option>
              </select>
            </div>

            <div className="filters-row">
              {filterPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className={
                    activeFilter === pill
                      ? 'filter-pill selected'
                      : 'filter-pill'
                  }
                  onClick={() => handleCategory(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>

            <div className="recipe-grid">
              {visibleRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="recipe-card-link"
                >
                  <article className="recipe-card">
                    <div className="recipe-photo">
                      <img src={recipe.image} alt={recipe.title} />
                      <span className="recipe-tag">{recipe.tag}</span>
                    </div>

                    <div className="recipe-info">
                      <h3>{recipe.title}</h3>

                      <div className="recipe-meta">
                        <span>{recipe.tag}</span>
                        {recipe.cuisine !== 'Unknown cuisine' && (
                          <span>{recipe.cuisine}</span>
                        )}
                      </div>

                      <div className="recipe-footer">
                        <span>
                          {recipe.cuisine !== 'Unknown cuisine'
                            ? recipe.cuisine
                            : 'Food Lore recipe'}
                        </span>

                        <button
                          type="button"
                          className="favorite-btn"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleFavorite(recipe.id);
                          }}
                        >
                          {favoriteIds.includes(String(recipe.id)) ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="empty-signpost">
              Something good starts with what you&apos;ve got.
              <span>Try an ingredient or explore a different category →</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">food lore.</div>
        <p>Good food. A little know-how. Your kind of people.</p>
        <span>Made for everyday cooks • © 2026 Food Lore</span>
      </footer>
    </div>
  );
}
