
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Login backend is not connected yet.");
  }

  return (
    <div className="min-h-screen bg-[#FAF9F3] text-[#294936]">
      {/* Navigation */}
      <header className="border-b border-[#E8E7DF] px-8 py-5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl font-bold">
            food lore.
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/">Explore recipes</Link>
            <Link href="/recipes/new">Post a recipe</Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login">Log in</Link>
            <Link
              href="/signup"
              className="rounded bg-[#315C42] px-4 py-2 text-white"
            >
              Join the table
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-2">
        {/* Left image panel */}
        <section
          className="relative flex min-h-[480px] items-end overflow-hidden rounded-xl bg-[#41644C] p-9 text-white"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(12,35,22,0.85), transparent 75%), url('/images/login-cooking.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative">
            <p className="mb-3 text-sm">Your seat at the table</p>
            <h2 className="max-w-sm font-serif text-4xl font-bold">
              Good food starts with a little confidence.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6">
              Find your next easy dinner. Share your first
              kitchen win. Learn a little from each other.
            </p>
            <p className="mt-5 text-xs">
              Real student recipes · No fancy skills needed
            </p>
          </div>
        </section>

        {/* Login form */}
        <section className="flex flex-col justify-center py-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#68816D]">
            Good to have you back
          </p>

          <h1 className="mb-4 font-serif text-5xl font-bold">
            Welcome to the table.
          </h1>

          <p className="mb-9 text-sm leading-6 text-gray-600">
            Log in to save your favorites, share recipes,
            and swap tips with other everyday cooks.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#315C42]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-20 text-gray-900 outline-none focus:border-[#315C42]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#315C42]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Keep me logged in
              </label>
              <span className="text-[#315C42]">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#315C42] py-3 font-medium text-white hover:bg-[#254A34]"
            >
              Log in
            </button>

            {message && (
              <p role="status" className="text-sm text-[#315C42]">
                {message}
              </p>
            )}
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            New around here?{" "}
            <Link href="/signup" className="font-semibold text-[#315C42]">
              Create an account
            </Link>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E7DF] px-8 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 text-xs text-gray-500">
          <span>food lore. — Good food. A little know-how.</span>
          <span>Made for everyday cooks · © 2026 Food Lore</span>
        </div>
      </footer>
    </div>
  );
}
