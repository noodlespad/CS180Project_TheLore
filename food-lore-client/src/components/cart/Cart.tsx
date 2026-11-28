"use client";
import './cart.css';
import Image from 'next/image';
import Link from 'next/link';
import recipeImg from '/public/pasta-recipe.jpg';
import { useState, useEffect } from "react";
import { CartItem } from "@/types/cart";


export default function Cart() {
    //use state is storing changes and effect isrunning the code automatically when the component loads

    //holds the list of groceries
    const [items, setItems] = useState<CartItem[]>([]);
    //checks if the page is loading
    const [loading, setLoading] = useState(true);

    //  Add Item State (stores what the user types)
    const [newName, setNewName] = useState("");
    const [newQty, setNewQty] = useState("");

    // Edit Item State (keeps track of whats being edited and holds what the user types )
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editQty, setEditQty] = useState("");

    //runs when the page loads
    useEffect(() => {
    async function fetchCart() {
        try {
            //grabs form the database
            const res = await fetch("/api/cart");
            const data = await res.json();
            if (res.ok) {
            setItems(data.items);
            }
        } catch (err) {
            console.error("Error loading cart:", err);
        } finally {
            setLoading(false);
        }
        }
        fetchCart();
    }, []);

    // Add a new item 
    async function handleAddItem(e: React.FormEvent) {
        //keeps it from reloading the whole page
        e.preventDefault();
        //keeps it from adding empty items
        if (!newName.trim()) return;
        //sends the new name and quantity
        const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), quantity: newQty.trim() }),
        });
        //adds new item to the end of the list and clears the text fields
        if (res.ok) {
        const data = await res.json();
        setItems((prev) => [...prev, data.item]);
        setNewName("");
        setNewQty("");
        }
    }

    // Toggle the purchased checkbox
    async function handleTogglePurchased(item: CartItem) {
        //makses the purchased option true/false by flipping it
        const updatedStatus = !item.is_purchased;

        const res = await fetch(`/api/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_purchased: updatedStatus }),
        });

        if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
            prev.map((i) => (i.id === item.id ? data.item : i))
        );
        }
    }

    // Save inline edits
    async function handleSaveEdit(itemId: number) {
        const res = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim(), quantity: editQty.trim() }),
        });

        if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
            prev.map((i) => (i.id === itemId ? data.item : i))
        );
        setEditingId(null);
        }
    }

    // Delete an item
    async function handleDelete(itemId: number) {
        //removes it from neon
        const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        });
        //removes the item from the list
        if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        }
    }

    function startEditing(item: CartItem) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditQty(item.quantity || "");
    }
    
    const toBuyItems = items.filter((item) => !item.is_purchased);
    const purchasedItems = items.filter((item) => item.is_purchased);
    const progressPercent =
        items.length === 0 ? 0 : Math.round((purchasedItems.length / items.length) * 100);

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
            <Link href="/login" className="ghost-btn">
            Log in
            </Link>
            <Link href="/signup" className="dark-btn">
            Join the table
            </Link>
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
                                <span className='fl-item-count'>{items.length} · {toBuyItems.length} remaining </span>
                            </div>
                            <div className='fl-header-row'>
                                <span className='fl-progress-text'>{purchasedItems.length} of {items.length} purchased</span>
                                <span className='fl-progress-text'>{progressPercent}%</span>
                            </div>
                            <div className='fl-progress-track'>
                                <div className='fl-progress-fill' style={{width:'${progressPercent}%'}}></div>
                            </div>
                        </div>
                        <div className='fl-column-headers'>
                                <span className='fl-label-buy'>TO BUY · {toBuyItems.length}</span>
                                <span className='fl-label-qty'>QUANTITY</span>
                        </div>
                        <div className='fl-recipe-group'>
                            <div className='fl-recipe-group'>
                            {loading ? (
                                <div className='fl-list-footer-note'>Loading your shopping list...</div>
                            ) : (
                                <>
                                    {toBuyItems.map((item) =>
                                        editingId === item.id ? (
                                            <div key={item.id} className='fl-edit-block'>
                                                <span className='fl-edit-header'>✎ Editing item</span>
                                                <div className='fl-edit-fields'>
                                                    <div className='fl-edit-field-group name'>
                                                        <span className='fl-edit-label'>Ingredient name</span>
                                                        <input
                                                            type='text'
                                                            className='fl-edit-input-large'
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className='fl-edit-field-group qty'>
                                                        <span className='fl-edit-label'>Quantity & unit</span>
                                                        <input
                                                            type='text'
                                                            className='fl-edit-input-large'
                                                            value={editQty}
                                                            onChange={(e) => setEditQty(e.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        type='button'
                                                        className='fl-edit-trash'
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        ✖
                                                    </button>
                                                </div>
                                                <div className='fl-edit-footer'>
                                                    <span className='fl-edit-helper'>
                                                        Changes apply only to your shopping list.
                                                    </span>
                                                    <div className='fl-edit-actions'>
                                                        <button
                                                            type='button'
                                                            className='fl-btn-cancel'
                                                            onClick={() => setEditingId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='fl-btn-save'
                                                            onClick={() => handleSaveEdit(item.id)}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={item.id} className='fl-cart-item'>
                                                <input
                                                    type='checkbox'
                                                    checked={item.is_purchased}
                                                    onChange={() => handleTogglePurchased(item)}
                                                />
                                                <span className='fl-cart-item-name'>
                                                    {item.name}{' '}
                                                    {item.is_optional && (
                                                        <span className='fl-item-optional'>(optional)</span>
                                                    )}
                                                </span>
                                                <span className='fl-cart-item-qty'>{item.quantity}</span>
                                                <div className='fl-item-actions'>
                                                    <button
                                                        type='button'
                                                        className='fl-action-btn'
                                                        onClick={() => startEditing(item)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='fl-action-btn'
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        ✖
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    {purchasedItems.length > 0 && (
                                        <div className='fl-purchased-group'>
                                            <span className='fl-purchased-header'>
                                                ✓ Purchased ({purchasedItems.length})
                                            </span>
                                            {purchasedItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className='fl-cart-item fl-cart-item-checked'
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked={item.is_purchased}
                                                        onChange={() => handleTogglePurchased(item)}
                                                    />
                                                    <span className='fl-cart-item-name'>{item.name}</span>
                                                    <span className='fl-cart-item-qty'>{item.quantity}</span>
                                                    <div className='fl-item-actions'>
                                                        <button
                                                            type='button'
                                                            className='fl-action-btn'
                                                            onClick={() => startEditing(item)}
                                                        >
                                                            ✎ Edit
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='fl-action-btn'
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className='fl-list-footer-note'>
                                Tick a box when it’s in your basket. Untick it to move it back to your list.
                            </div>
                        </div>
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

                    <form className='fl-add-item-form' onSubmit={handleAddItem}>
                        <span className='fl-form-title'>Need anything else?</span>
                        <span className='fl-recipe-meta'>Add your own items, recipe or not.</span>
                        <span className='fl-form-label'>Item name</span>
                        <input className='fl-form-input' placeholder="e.g. Bananas" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                        <span className='fl-form-label'>Quantity & unit (optional)</span>
                        <input className='fl-form-input' placeholder="e.g. 4 or 1 bunch" value={newQty} onChange={(e) => setNewQty(e.target.value)}></input>
                        <button className='fl-form-submit'>+ Add Item</button>
                    </form>
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