import type { ApiDrink, ApiDrinkIngredients, ApiDrinkMeasures } from '@/types/api/ApiDrink';
import type { MappedDrink, MappedDrinkIngredient } from '@/types/MappedDrink';

/**
 * Converts an array of ApiDrinks to an array of MappedDrinks
 * @param drinks Array of ApiDrinks from API response
 * @returns Array of MappedDrinks for display in the app
 */
export const mapDrinks: (drinks: ApiDrink[]) => MappedDrink[] = (drinks) => {
  return drinks.map((drink) => {
    const ingredients: MappedDrinkIngredient[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof ApiDrinkIngredients];
      const measure = drink[`strMeasure${i}` as keyof ApiDrinkMeasures];

      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure,
        });
      }
    }

    return {
      id: drink.idDrink,
      name: drink.strDrink,
      ingredients,
      alcoholic: drink.strAlcoholic,
      category: drink.strCategory,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      thumbnail: drink.strDrinkThumb,
    };
  });
};
