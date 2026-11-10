"use client";
import './cart.css';
import Image from 'next/image';
import recipeImg from '/public/pasta-recipe.jpg';


export default function Cart() {
return(
    
    <div className="fl-cart-page">
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
            <a href="#">Shopping list</a>
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
        </div>
        <div className="fl-cart">
            <h1>Your Shopping List</h1>
            <p className='fl-subtitle'> A little planning, an easier dinner. Edit what you need and tick it off as you shop.</p>
            <div className='fl-success-banner'>
                <div className='fl-banner-left'>
                    <span className='fl-banner-icon'>✔️</span>
                    <div className='fl-banner-text'>
                        <span className='fl-banner-title'>8 ingredients added to your shopping list</span>
                        <span className='fl-banner-subtitle'>From One-pot tomato & spinach pasta · 2 servings</span>
                    </div>
                </div>
                <button className='fl-banner-link'>Back to recipe →</button>
            </div>
            <div className='fl-cart-layout'>
                <div className='fl-cart-main'>
                    <div className='fl-list-card'>
                        <div className='fl-list-header'>
                            <div className='fl-header-row'>
                                <h2>What you'll need</h2>
                                <span className='fl-item-count'>8 items · 6 remaining</span>
                            </div>
                            <div className='fl-header-row'>
                                <span className='fl-progress-text'>2 of 8 purchased</span>
                                <span className='fl-progress-text'>25%</span>
                            </div>
                            <div className='fl-progress-track'>
                                <div className='fl-progress-fill' style={{width:'25%'}}></div>
                            </div>
                        </div>
                        <div className='fl-column-headers'>
                                <span className='fl-label-buy'>TO BUY · 6</span>
                                <span className='fl-label-qty'>QUANTITY</span>
                        </div>
                        <div className='fl-recipe-group'>
                            <div className='fl-cart-item'>
                                <input type='checkbox' />
                                <span className='fl-cart-item-name'>Penne Pasta</span>
                                <span className='fl-cart-item-qty'>200 g</span>
                                <div className='fl-item-actions'>
                                    <button className='fl-action-btn'>✎ Edit</button>
                                    <button className='fl-action-btn'>✖</button>
                                </div>
                            </div>
                            <div className='fl-cart-item'>
                                <input type='checkbox' />
                                <span className='fl-cart-item-name'>Chopped tomatoes</span>
                                <span className='fl-cart-item-qty'>1 Can(400 g)</span>
                                <div className='fl-item-actions'>
                                    <button className='fl-action-btn'>✎ Edit</button>
                                    <button className='fl-action-btn'>✖</button>
                                </div>
                            </div>
                            <div className='fl-cart-item'>
                                <input type='checkbox' />
                                <span className='fl-cart-item-name'>Fresh Spinach</span>
                                <span className='fl-cart-item-qty'>2 Cups</span>
                                <div className='fl-item-actions'>
                                    <button className='fl-action-btn'>✎ Edit</button>
                                    <button className='fl-action-btn'>✖</button>
                                </div>
                            </div>
                            <div className='fl-edit-block'>
                                <span className='fl-edit-header'>✎ Editing item</span>
                                <div className='fl-edit-fields'>
                                    <div className='fl-edit-field-group name'>
                                        <span className='fl-edit-label'>Ingredient name</span>
                                        <input type='text' className='fl-edit-input-large' defaultValue={"Onion, finely chopped"} />
                                    </div>
                                    <div className='fl-edit-field-group qty'>
                                        <span className='fl-edit-label'>Quantity & unit</span>
                                        <input type='text' className='fl-edit-input-large' defaultValue={"½ small"} />
                                    </div>
                                    <button className='fl-edit-trash'>✖</button>
                                </div>
                                <div className='fl-edit-footer'>
                                    <span className='fl-edit-helper'>Changes apply only to your shopping list.</span>
                                    <div className='fl-edit-actions'>
                                        <button className='fl-btn-cancel'>Cancel</button>
                                        <button className='fl-btn-save'>Save</button>
                                    </div>
                                </div>
                            </div>
                            <div className='fl-cart-item'>
                                <input type='checkbox' />
                                <span className='fl-cart-item-name'>Garlic cloves, finely chopped</span>
                                <span className='fl-cart-item-qty'>2</span>
                                <div className='fl-item-actions'>
                                    <button className='fl-action-btn'>✎ Edit</button>
                                    <button className='fl-action-btn'>✖</button>
                                </div>
                            </div>
                            <div className='fl-cart-item'>
                                <input type='checkbox' />
                                <span className='fl-cart-item-name'>Grated parmesan <span className='fl-item-optional'>(optional)</span> </span>
                                <span className='fl-cart-item-qty'>2 tbsp</span>
                                <div className='fl-item-actions'>
                                    <button className='fl-action-btn'>✎ Edit</button>
                                    <button className='fl-action-btn'>✖</button>
                                </div>
                            </div>
                            <div className='fl-purchased-group'>
                                <span className='fl-purchased-header'>✓ Purchased (2)</span>
                                <div className='fl-cart-item fl-cart-item-checked'>
                                    <input type='checkbox' defaultChecked />
                                    <span className='fl-cart-item-name'>Olive oil</span>
                                    <span className='fl-cart-item-qty'>1 tbsp</span>
                                    <div className='fl-item-actions'>
                                        <button className='fl-action-btn'>✎ Edit</button>
                                        <button className='fl-action-btn'>✖</button>
                                    </div>
                                </div>
                                <div className='fl-cart-item fl-cart-item-checked'>
                                    <input type='checkbox' defaultChecked />
                                    <span className='fl-cart-item-name'>Salt, plus more to taste</span>
                                    <span className='fl-cart-item-qty'>½ tsp</span>
                                    <div className='fl-item-actions'>
                                        <button className='fl-action-btn'>✎ Edit</button>
                                        <button className='fl-action-btn'>✖</button>
                                    </div>
                                </div>
                            </div>
                            <div className='fl-list-footer-note'>Tick a box when it’s in your basket. Untick it to move it back to your list.</div>
                        </div>
                    </div>
                </div>
                <div className='fl-cart-sidebar'>
                    <div className='fl-sidebar-card'>
                        <div className='fl-recipe-card'>
                            <Image className='fl-recipe-image' src={recipeImg} alt="Recipe image" />
                            <span className='fl-progress-text'>ON YOUR MENU</span>
                            <span className='fl-recipe-title'>One-pot tomato & spinach pasta</span>
                            <span className='fl-recipe-meta'>2 servings · 20 minutes · Beginner friendly</span>
                            <button className='fl-view-recipe'>View recipe</button>
                            <span className='fl-recipe-meta'>You’ll also need 2½ cups water — no need to add that to your basket.</span>
                        </div>
                    </div>

                    <div className='fl-add-item-form'>
                        <span className='fl-form-title'>Need anything else?</span>
                        <span className='fl-recipe-meta'>Add your own items, recipe or not.</span>
                        <span className='fl-form-label'>Item name</span>
                        <input className='fl-form-input'defaultValue={"e.g. Bananas"}></input>
                        <span className='fl-form-label'>Quantity & unit (optional)</span>
                        <input className='fl-form-input'defaultValue={"e.g. 4 or 1 bunch"}></input>
                        <button className='fl-form-submit'>+ Add Item</button>
                    </div>
                    <div className='fl-sidebar-card'>
                        <div className='fl-action-card'>
                            <span className='fl-action-title'>Check your cupboard first.</span>
                            <span className='fl-action-text'>Already have something? Remove it with the bin icon to keep your shop simple.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="site-footer">
            <div className="footer-brand">food lore.</div>
            <p>Good food. A little know-how. Your kind of people.</p>
            <span>Made for everyday cooks • © 2026 Food Lore</span>
        </footer>
    </div>
);
}