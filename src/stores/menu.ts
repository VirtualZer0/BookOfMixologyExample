import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { MappedDrink } from '@/types/MappedDrink';
import type { PartialRecord } from '@/types/helpers/PartialRecord';
import type { ApiDrinkList } from '@/types/api/ApiDrink';
import { mapDrinks } from '@/utils/mapDrinks';
import { cocktailCodes } from '@/utils/cocktailCodes';
import type { LoadingState } from '@/types/LoadingState';

const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

/**
 * Encapsulates the menu store and provides access to it
 */
export const useMenuStore = defineStore('menu', () => {
  const cocktails: Ref<PartialRecord<(typeof cocktailCodes)[number], MappedDrink[]>> = ref({});
  const loadingState: Ref<LoadingState> = ref('success');
  const lastLoadingError = ref('');

  /**
   * Returns a list of cocktails from store. If data is missing, it will first request and store it.
   * @param code Cocktail code
   * @returns Cocktail list
   */
  const getCocktails = async (code: (typeof cocktailCodes)[number]) => {
    if (cocktails.value[code]) {
      return cocktails.value[code];
    }

    loadingState.value = 'loading';

    const response = await fetch(
      `${apiEndpoint}?` +
        new URLSearchParams({
          s: code,
        }).toString(),
    );

    if (!response.ok) {
      loadingState.value = 'error';
      lastLoadingError.value = response.statusText;
      throw new Error(lastLoadingError.value);
    }

    const data = (await response.json()) as ApiDrinkList;

    if (!data.drinks) {
      loadingState.value = 'error';
      lastLoadingError.value = 'No drinks found';
      throw new Error(lastLoadingError.value);
    }

    cocktails.value[code] = mapDrinks(data.drinks);

    loadingState.value = 'success';

    return cocktails.value[code];
  };

  return { cocktails, getCocktails, loadingState, lastLoadingError };
});
