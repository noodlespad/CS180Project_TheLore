const ingredients = [
  '200 g penne pasta',
  '1 can (400 g) chopped tomatoes',
  '2 cups fresh spinach',
  '1/2 small onion, finely chopped',
  '2 garlic cloves, finely chopped',
  '1 tbsp olive oil',
  '1/2 tsp salt, plus more to taste',
  '2 tbsp grated parmesan (optional)',
];

const steps = [
  {
    title: 'Get everything ready',
    description:
      'Chop the onion and garlic into small pieces. Rinse the spinach. Measure out your pasta, and keep 2 cups of water nearby.',
    time: '5 min',
  },
  {
    title: 'Softer the onion and garlic',
    description:
      'Add the olive oil to a large pot over medium heat. Add the onion and stir for 2 minutes, until it looks slightly sweet. Add the garlic and stir for 30 seconds.',
    time: '3 min',
  },
  {
    title: 'Let the pot do the work',
    description:
      'Add the dry pasta, canned tomatoes, salt, and 2 cups of water. Bring to a gentle bubble, then lower the heat. Cook uncovered for 10 to 12 minutes, stirring every couple of minutes, until the pasta is tender.',
    time: '10–12 min',
  },
  {
    title: 'Add the greens. Dinner is ready.',
    description:
      'Stir in the spinach until it softens and wilts. Spoon into bowls and finish with a little parmesan, if you like.',
    time: '2 min',
  },
];

const tips = [
  'One large pot works best, so the tomato sauce and pasta can cook together.',
  'A splash of water helps loosen the sauce if it gets too thick.',
  'If you like extra richness, stir in a spoonful of cream at the end.',
];

const comments = [
  {
    name: 'Sam Rivera',
    initials: 'SR',
    time: '2 days ago',
    text: 'Made this after my evening class and it was so easy. Frozen spinach works too — I added a handful straight from the freezer in the last few minutes!',
  },
  {
    name: 'Jordan Lee',
    initials: 'JL',
    time: '3 days ago',
    text: 'First time cooking pasta in the sauce. Stirring really helps keep it from sticking, and I skipped the parmesan and added a pinch of chili flakes instead.',
  },
];

export default function RecipePage() {
  return (
    <div className="foodlore-app recipe-page">
      <header className="foodlore-header recipe-header">
        <div className="brand-group">
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          <span className="brand-name">food lore.</span>
        </div>

        <nav className="top-nav" aria-label="Main navigation">
          <a href="/recipe">Explore recipes</a>
          <a href="#">Shopping list</a>
          <a href="#">Post a recipe</a>
        </nav>

        <div className="header-actions">
          <span className="mini-user">Hi, Maya</span>
          <button type="button" className="dark-btn panel-avatar">MC</button>
        </div>
      </header>

      <main className="recipe-page-shell">
        <a className="recipe-backlink" href="/">
          <span>←</span>
          Back to recipes / One pot
        </a>

        <section className="recipe-hero">
          <div className="recipe-meta-panel">
            <p className="recipe-kicker">SMALL KITCHEN, BIG COMFORT.</p>
            <h1 className="recipe-title">One-pot tomato &amp; spinach pasta</h1>
            <p className="recipe-summary">
              A cozy, saucy dinner made with pantry staples. No separate pan, no fancy skills, and only one pot to wash.
            </p>

            <div className="recipe-author-row">
              <span className="recipe-avatar">MC</span>
              <div className="recipe-author-meta">
                <strong>Maya Chen</strong>
                <span>Shared October 8, 2026</span>
              </div>
            </div>

            <div className="recipe-tag-row">
              <span className="recipe-tag-pill">Beginner friendly</span>
              <span className="recipe-tag-pill">Vegetarian</span>
              <span className="recipe-tag-pill">One pot</span>
            </div>

            <div className="recipe-actions">
              <button type="button" className="recipe-button primary">
                <span aria-hidden="true">♡</span> Save recipe
              </button>
              <button type="button" className="recipe-button">
                <span aria-hidden="true">⇄</span> Share
              </button>
            </div>
          </div>

          <div className="recipe-visual-card">
            <img
              src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80"
              alt="One-pot tomato and spinach pasta"
            />
          </div>
        </section>

        <div className="recipe-highlight-bar">
          <div className="recipe-stat">
            <span className="recipe-stat-icon">◔</span>
            <div className="recipe-stat-copy">
              <span>Total time</span>
              <strong>20 minutes</strong>
            </div>
          </div>

          <div className="recipe-stat">
            <span className="recipe-stat-icon">⌁</span>
            <div className="recipe-stat-copy">
              <span>Prep / cook</span>
              <strong>5 min / 15 min</strong>
            </div>
          </div>

          <div className="recipe-stat">
            <span className="recipe-stat-icon">◍</span>
            <div className="recipe-stat-copy">
              <span>Servings</span>
              <strong>2 people</strong>
            </div>
          </div>

          <div className="recipe-stat">
            <span className="recipe-stat-icon">◫</span>
            <div className="recipe-stat-copy">
              <span>Budget</span>
              <strong>$2.40 / serving</strong>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <aside className="recipe-sidebar">
            <div className="recipe-card-panel ingredients-card">
              <div className="ingredients-head">
                <h3>What you&apos;ll need</h3>
                <span className="ingredients-count">2</span>
              </div>

              <div className="ingredients-bookmark">Ingredients for 2 servings</div>

              <ul className="ingredients-list">
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>

              <button type="button" className="ingredients-button">
                Add ingredients to shopping list
              </button>
            </div>

            <div className="recipe-tips-box">
              <h3>Keep it simple</h3>
              <ul className="tip-list">
                {tips.map((tip) => (
                  <li key={tip}>
                    <span className="tip-bullet">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-tips-box peach-box">
              <h3>Tomorrow-you says thanks.</h3>
              <ul className="tip-list">
                <li>
                  <span className="tip-bullet">◌</span>
                  <span>Cool leftovers and refrigerate in a sealed container within 2 hours. Eat within 3 days.</span>
                </li>
              </ul>
            </div>
          </aside>

          <section className="recipe-steps-panel">
            <div className="steps-header">
              <h2>Let&apos;s make it</h2>
              <span>4 simple steps</span>
            </div>

            <div className="step-list">
              {steps.map((step, index) => (
                <div key={step.title} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-copy">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                  <div className="step-time">{step.time}</div>
                </div>
              ))}
            </div>

            <div className="recipe-comment-panel">
              <h3>A little kitchen wisdom</h3>
              <div className="comment-prompt">
                <span className="comment-avatar">MC</span>
                <div className="comment-input-wrap">
                  <div className="commenting-as">Commenting as Maya Chen</div>
                  <div className="comment-compose">
                    <input
                      className="comment-input"
                      type="text"
                      placeholder="What works for you? Any tips or questions?"
                      aria-label="Ask a cooking question"
                    />
                    <button type="button" className="comment-submit">
                      Post comment
                    </button>
                  </div>
                </div>
              </div>

              <div className="comment-list">
                {comments.map((comment) => (
                  <div key={`${comment.name}-${comment.time}`} className="comment-item">
                    <div className="comment-head">
                      <span className="avatar">{comment.initials}</span>
                      <div>
                        <div className="comment-name">{comment.name}</div>
                        <div className="comment-time">{comment.time}</div>
                      </div>
                    </div>
                    <p className="comment-body">{comment.text}</p>
                    <div className="comment-actions">
                      <span>Helpful</span>
                      <span>Reply</span>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#" className="view-more">
                View all 12 comments →
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer recipe-footer">
        <div className="footer-brand">food lore.</div>
        <p>Good food. A little know-how. Your kind of people.</p>
        <span>Made for everyday cooks • © 2026 Food Lore</span>
      </footer>
    </div>
  );
}
