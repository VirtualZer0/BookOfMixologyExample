import { mapDrinks } from '@/utils/mapDrinks';

describe('mapDrinks', () => {
  it('should correctly map an ApiDrink to MappedDrink', () => {
    const apiDrinks = [
      {
        idDrink: '12345',
        strDrink: 'Margarita',
        strAlcoholic: 'Alcoholic',
        strCategory: 'Cocktail',
        strGlass: 'Cocktail glass',
        strInstructions: 'Mix all ingredients.',
        strDrinkThumb: 'https://example.com/thumb.jpg',
        strIngredient1: 'Tequila',
        strMeasure1: '50ml',
        strIngredient2: 'Triple sec',
        strMeasure2: '30ml',
      },
    ];

    const mappedDrinks = mapDrinks(apiDrinks);

    expect(mappedDrinks).toHaveLength(1);
    expect(mappedDrinks[0].id).toBe('12345');
    expect(mappedDrinks[0].name).toBe('Margarita');
    expect(mappedDrinks[0].ingredients).toHaveLength(2);
    expect(mappedDrinks[0].ingredients[0]).toEqual({
      name: 'Tequila',
      measure: '50ml',
    });
    expect(mappedDrinks[0].ingredients[1]).toEqual({
      name: 'Triple sec',
      measure: '30ml',
    });
  });

  it('should return an empty ingredients array when no ingredients are provided', () => {
    const apiDrinks = [
      {
        idDrink: '67890',
        strDrink: 'No Ingredients',
        strAlcoholic: 'Non_Alcoholic',
        strCategory: 'Mocktail',
        strGlass: 'Mocktail glass',
        strInstructions: 'Just mix water.',
        strDrinkThumb: '',
        // нет ингредиентов
      },
    ];

    const mappedDrinks = mapDrinks(apiDrinks);

    expect(mappedDrinks[0].ingredients).toHaveLength(0);
  });

  it('should handle partial data with missing ingredients', () => {
    const apiDrinks = [
      {
        idDrink: '13579',
        strDrink: 'Partial Drink',
        strAlcoholic: 'Alcoholic',
        strCategory: 'Cocktail',
        strGlass: 'Highball glass',
        strInstructions: 'Shake well.',
        strDrinkThumb: 'https://example.com/thumb2.jpg',
        strIngredient1: 'Rum',
        strMeasure1: '45ml',
        strIngredient2: '',
        strMeasure2: '',
        // остальные ингредиенты пустые
      },
    ];

    const mappedDrinks = mapDrinks(apiDrinks);

    expect(mappedDrinks[0].ingredients).toHaveLength(1);
    expect(mappedDrinks[0].ingredients[0]).toEqual({
      name: 'Rum',
      measure: '45ml',
    });
  });

  it('should map correctly when some ingredients and measures are missing', () => {
    const apiDrinks = [
      {
        idDrink: '24680',
        strDrink: 'Test Drink',
        strAlcoholic: 'Alcoholic',
        strCategory: 'Mocktail',
        strGlass: 'Test glass',
        strInstructions: 'Mix ingredients.',
        strDrinkThumb: '',
        strIngredient1: 'Gin',
        strMeasure1: '40ml',
        strIngredient2: 'Lime',
        strMeasure2: '10ml',
        strIngredient3: '',
        strMeasure3: '',
        // и так далее для остальных ингредиентов
      },
    ];

    const mappedDrinks = mapDrinks(apiDrinks);

    expect(mappedDrinks[0].ingredients).toHaveLength(2);
    expect(mappedDrinks[0].ingredients[0]).toEqual({
      name: 'Gin',
      measure: '40ml',
    });
    expect(mappedDrinks[0].ingredients[1]).toEqual({
      name: 'Lime',
      measure: '10ml',
    });
  });
});
