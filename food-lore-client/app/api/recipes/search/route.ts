import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

   const ingredients = query
    .toLowerCase()
    .split(/,| and /)
    .map((item) => item.trim())
    .filter(Boolean);

  console.log(ingredients);

  try {
  // If user enters multiple ingredients like:
  // "egg and bread" or "egg, bread"
  if (ingredients.length > 1) {
    const ingredientResults = await Promise.all(
      ingredients.map(async (ingredient) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
        );

        if (!response.ok) {
          throw new Error("TheMealDB ingredient search failed");
        }

        const data = await response.json();

        return data.meals ?? [];
      })
    );

    // Start with recipes from first ingredient
    let matches = ingredientResults[0] ?? [];

    // Keep only recipes that also appear
    // in every other ingredient result
    for (const result of ingredientResults.slice(1)) {
      const ids = new Set(
        result.map((meal: any) => meal.idMeal)
      );

      matches = matches.filter((meal: any) =>
        ids.has(meal.idMeal)
      );
    }

    const recipes = matches.map((meal: any) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: "Recipe",
      cuisine: null,
    }));

    return NextResponse.json({ recipes });
  }

  // Otherwise do your normal meal-name search
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("TheMealDB request failed");
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