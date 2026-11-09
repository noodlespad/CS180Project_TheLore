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

const profileRecipes: ProfileRecipe[] = [
  {
    id: 1,
    title: 'One pot tomato & spinach pasta',
    description: 'A cozy dinner with just one pot to wash.',
    time: '20 min',
    level: 'Beginner',
    tag: 'One pot',
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80',
    comments: 12,
  },
  {
    id: 2,
    title: 'Peanut butter banana oats',
    description: 'An easy breakfast for busy mornings.',
    time: '10 min',
    level: 'Beginner',
    tag: 'Breakfast',
    image:
      'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FRecipes%2F2021-09-peanut-butter-oatmeal%2F2021-09-13_ATK6875?auto=format&fit=crop&w=900&q=80',
    comments: 4,
  },
  {
    id: 3,
    title: 'Jammy eggs on avocado toast',
    description: 'A simple café-style breakfast at home.',
    time: '12 min',
    level: 'Beginner',
    tag: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    comments: 7,
  },
];

export default function ProfilePage() {
  return (
    <div className="profile-app">
      <header className="profile-header">
        <a className="profile-brand" href="/">
          <span className="profile-brand-icon">♡</span>
          <span>food lore.</span>
        </a>

        <nav className="profile-nav" aria-label="Main navigation">
          <a href="/">Explore recipes</a>
          <a href="#">Post a recipe</a>
        </nav>

        <div className="profile-user">
          <span>Hi, Maya</span>
          <span className="header-avatar">MC</span>
          <span className="profile-chevron">⌄</span>
        </div>
      </header>

      <main className="profile-shell">
        <div className="profile-toolbar">
          <span className="profile-eyebrow">YOUR KITCHEN CORNER</span>

          <div className="profile-links">
            <a href="#">Account settings</a>
            <a href="#">Log out</a>
          </div>
        </div>

        <section className="profile-card">
          <div className="profile-avatar">MC</div>

          <div className="profile-details">
            <div className="profile-name">
              <h1>Maya Chen</h1>
              <span>@mayacooks</span>
            </div>

            <p>
              Student, pasta enthusiast, and still figuring out my tiny kitchen.
              Sharing quick vegetarian meals that get me through busy weeks.
            </p>

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
            <span className="stat-icon">✎</span>

            <div>
              <strong>3</strong>
              <p>Recipes shared</p>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon">◯</span>

            <div>
              <strong>23</strong>
              <p>Comments on your recipes</p>
            </div>
          </article>

          <article className="stat-card">
            <span className="stat-icon">♡</span>

            <div>
              <strong>8</strong>
              <p>Recipes saved</p>
            </div>
          </article>
        </section>

        <section className="profile-recipes">
          <div className="profile-tabs-row">
            <div className="profile-tabs">
              <button className="profile-tab active" type="button">
                My recipes (3)
              </button>

              <button className="profile-tab" type="button">
                Saved recipes (8)
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

          <div className="profile-recipe-grid">
            {profileRecipes.map((recipe) => (
              <article className="profile-recipe-card" key={recipe.id}>
                <div className="profile-recipe-image">
                  <img src={recipe.image} alt={recipe.title} />

                  <span className="profile-recipe-tag">
                    {recipe.tag}
                  </span>

                  <button
                    className="profile-recipe-menu"
                    type="button"
                    aria-label={`Options for ${recipe.title}`}
                  >
                    •••
                  </button>
                </div>

                <div className="profile-recipe-body">
                  <h3>{recipe.title}</h3>

                  <p className="profile-recipe-description">
                    {recipe.description}
                  </p>

                  <div className="profile-recipe-meta">
                    <span>{recipe.time}</span>
                    <span>{recipe.level}</span>
                  </div>

                  <div className="profile-recipe-footer">
                    <div className="profile-recipe-author">
                      <span className="recipe-avatar">MC</span>
                      <span>Maya Chen</span>
                    </div>

                    <span>◯ {recipe.comments}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

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