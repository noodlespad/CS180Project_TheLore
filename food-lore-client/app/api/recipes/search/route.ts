import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const category = request.nextUrl.searchParams.get("category");
  const ingredient = request.nextUrl.searchParams.get("ingredient");

  // CATEGORY FILTER
  if (category) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error("Category search failed");
      }

      const data = await response.json();

      const recipes =
        data.meals?.map((meal: any) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          category,
          cuisine: null,
        })) ?? [];

      return NextResponse.json({ recipes });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Could not retrieve category recipes" },
        { status: 500 }
      );
    }
  }

  // INGREDIENT FILTER
  if (ingredient) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
      );

      if (!response.ok) {
        throw new Error("Ingredient search failed");
      }

      const data = await response.json();

      const recipes =
        data.meals?.map((meal: any) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          category: "Recipe",
          cuisine: null,
        })) ?? [];

      return NextResponse.json({ recipes });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Could not retrieve ingredient recipes" },
        { status: 500 }
      );
    }
  }

  // NAME SEARCH
  if (!query) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Recipe search failed");
    }

    const data = await response.json();

    const recipes =
      data.meals?.map((meal: any) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        cuisine: meal.strArea,
      })) ?? [];

    return NextResponse.json({ recipes });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not retrieve recipes" },
      { status: 500 }
    );
  }
}