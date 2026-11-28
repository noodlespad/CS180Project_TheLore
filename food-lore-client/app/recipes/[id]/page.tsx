import '@/app/globals.css';
import RecipeDetails from '@/src/components/recipe/RecipeDetails';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null;
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await response.json();

  const meal: Meal | undefined = data.meals?.[0];

  if (!meal) {
    return <div>Recipe not found.</div>;
  }

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(
        `${measure?.trim() ?? ''} ${ingredient.trim()}`.trim()
      );
    }
  }

  return (
    <RecipeDetails
      meal={meal}
      ingredients={ingredients}
    />
  );
}