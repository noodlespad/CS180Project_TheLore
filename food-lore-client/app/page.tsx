'use client';

import { useMemo, useState } from 'react';

type Recipe = {
  id: number;
  title: string;
  time: string;
  level: string;
  author: string;
  tag: string;
  image: string;
  saves: number;
};

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'One pot tomato & spinach pasta',
    time: '20 min',
    level: 'Beginner',
    author: 'Maya Chen',
    tag: 'One pot',
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80',
    saves: 12,
  },
  {
    id: 2,
    title: 'Better-than-takeout egg fried rice',
    time: '15 min',
    level: 'Beginner',
    author: 'Sam Rivera',
    tag: 'Budget friendly',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    saves: 9,
  },
  {
    id: 3,
    title: 'Crispy black bean quesadillas',
    time: '15 min',
    level: 'Beginner',
    author: 'Jordan Lee',
    tag: 'Vegetarian',
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    saves: 6,
  },
  {
    id: 4,
    title: 'Peanut butter banana oats',
    time: '30 min',
    level: 'Beginner',
    author: 'Maya Chen',
    tag: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80',
    saves: 4,
  },
  {
    id: 5,
    title: 'Crunchy chickpea lunch wraps',
    time: '10 min',
    level: 'Beginner',
    author: 'Alex Park',
    tag: 'No cook',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    saves: 5,
  },
  {
    id: 6,
    title: 'Jammy eggs on avocado toast',
    time: '12 min',
    level: 'Beginner',
    author: 'Maya Chen',
    tag: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    saves: 7,
  },
];

const filterPills = ['All recipes', 'Quick & easy', 'Budget friendly', 'Breakfast', 'No cook'];
const kitchenIngredients = ['Eggs', 'Rice', 'Pasta', 'Spinach', 'Beans', 'Cheese'];
const timeOptions = ['Any time', '15 minutes or less', '30 minutes or less', '45 minutes or less'];
const mealOptions = ['Vegetarian', 'One pot', 'No cook', 'No dairy', '5 ingredients or less'];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All recipes');
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState('Any time');

  const visibleRecipes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesFilter =
        activeFilter === 'All recipes' ||
        recipe.tag === activeFilter ||
        (activeFilter === 'Quick & easy' && Number.parseInt(recipe.time, 10) <= 15) ||
        (activeFilter === 'Budget friendly' && recipe.id === 2) ||
        (activeFilter === 'Breakfast' && recipe.tag === 'Breakfast') ||
        (activeFilter === 'No cook' && recipe.tag === 'No cook');

      const matchesQuery =
        q.length === 0 ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.author.toLowerCase().includes(q) ||
        recipe.tag.toLowerCase().includes(q);

      const matchesTime =
        selectedTime === 'Any time' ||
        (selectedTime === '15 minutes or less' && Number.parseInt(recipe.time, 10) <= 15) ||
        (selectedTime === '30 minutes or less' && Number.parseInt(recipe.time, 10) <= 30) ||
        (selectedTime === '45 minutes or less' && Number.parseInt(recipe.time, 10) <= 45);

      const matchesIngredient =
        selectedIngredient === null ||
        recipe.title.toLowerCase().includes(selectedIngredient.toLowerCase()) ||
        recipe.tag.toLowerCase().includes(selectedIngredient.toLowerCase());

      return matchesFilter && matchesQuery && matchesTime && matchesIngredient;
    });
  }, [activeFilter, query, selectedIngredient, selectedTime]);

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
          <a href="#">Explore recipes</a>
          <a href="#">Post a recipe</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="ghost-btn">
            Log in
          </button>
          <button type="button" className="dark-btn">
            Join the table
          </button>
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
                aria-label="Search recipes"
              />
              <button type="button">Find recipes</button>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
              alt="Pasta"
            />
            <div className="image-callout">
              <span className="mini-label">food lore.</span>
              <span className="mini-text">One pot tomato &amp; spinach pasta</span>
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
                    onClick={() => setSelectedIngredient((current) => (current === item ? null : item))}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="side-group">
              <h3>How much time do you have?</h3>
              <div className="radio-list">
                {timeOptions.map((option) => (
                  <label key={option} className={selectedTime === option ? 'radio-row selected' : 'radio-row'}>
                    <input
                      type="radio"
                      name="time-filter"
                      checked={selectedTime === option}
                      onChange={() => setSelectedTime(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="side-group">
              <h3>Make it your kind of meal</h3>
              <div className="check-list">
                {mealOptions.map((option) => (
                  <label key={option} className="check-row">
                    <input type="checkbox" defaultChecked={option === 'Vegetarian' || option === 'One pot'} />
                    <span>{option}</span>
                  </label>
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
                <span>6 recipes to get you started</span>
              </div>

              <button type="button" className="sort-btn">
                Sort: Community favorites ▾
              </button>
            </div>

            <div className="filters-row">
              {filterPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  className={activeFilter === pill ? 'filter-pill selected' : 'filter-pill'}
                  onClick={() => setActiveFilter(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>

            <div className="recipe-grid">
              {visibleRecipes.map((recipe) => (
                <article key={recipe.id} className="recipe-card">
                  <div className="recipe-photo">
                    <img src={recipe.image} alt={recipe.title} />
                    <span className="recipe-tag">{recipe.tag}</span>
                  </div>

                  <div className="recipe-info">
                    <h3>{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span>{recipe.time}</span>
                      <span>{recipe.level}</span>
                    </div>
                    <div className="recipe-footer">
                      <div className="author">
                        <span className="avatar">{recipe.author.slice(0, 2).toUpperCase()}</span>
                        <span>{recipe.author}</span>
                      </div>
                      <span className="favorites">♡ {recipe.saves}</span>
                    </div>
                  </div>
                </article>
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
