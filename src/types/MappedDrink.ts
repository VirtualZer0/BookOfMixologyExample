export interface MappedDrinkIngredient {
  name: string;
  measure?: string | null;
}

export interface MappedDrink {
  id: string;
  name: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: MappedDrinkIngredient[];
  thumbnail: string;
}
