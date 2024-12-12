import { setActivePinia, createPinia } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { mapDrinks } from '@/utils/mapDrinks';

jest.mock('@/utils/mapDrinks', () => ({
  mapDrinks: jest.fn(),
}));

global.fetch = jest.fn();

describe('Menu Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const store = useMenuStore();
    expect(store.cocktails).toEqual({});
    expect(store.loadingState).toBe('success');
    expect(store.lastLoadingError).toBe('');
  });

  describe('getCocktails', () => {
    it('should return cached cocktails if already present', async () => {
      const store = useMenuStore();
      store.cocktails['mockCode'] = [{ id: '1', name: 'Mocktail' }];

      const result = await store.getCocktails('mockCode');
      expect(result).toEqual([{ id: '1', name: 'Mocktail' }]);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should fetch and map cocktails if not cached', async () => {
      const store = useMenuStore();
      const mockResponse = {
        drinks: [{ idDrink: '1', strDrink: 'Mocktail' }],
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
      mapDrinks.mockReturnValue([{ id: '1', name: 'Mocktail' }]);

      const result = await store.getCocktails('mockCode');

      expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mockCode');
      expect(mapDrinks).toHaveBeenCalledWith(mockResponse.drinks);
      expect(store.cocktails['mockCode']).toEqual([{ id: '1', name: 'Mocktail' }]);
      expect(store.loadingState).toBe('success');
      expect(result).toEqual([{ id: '1', name: 'Mocktail' }]);
    });

    it('should set loadingState to "error" and store error message if the fetch fails', async () => {
      const store = useMenuStore();
      global.fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(store.getCocktails('mockCode')).rejects.toThrow('Internal Server Error');
      expect(store.loadingState).toBe('error');
      expect(store.lastLoadingError).toBe('Internal Server Error');
    });

    it('should handle empty drink lists correctly', async () => {
      const store = useMenuStore();
      const mockResponse = { drinks: null };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      await expect(store.getCocktails('mockCode')).rejects.toThrow('No drinks found');
      expect(store.loadingState).toBe('error');
      expect(store.lastLoadingError).toBe('No drinks found');
    });

    it('should reset loadingState to "success" after a successful fetch', async () => {
      const store = useMenuStore();
      const mockResponse = {
        drinks: [{ idDrink: '1', strDrink: 'Mocktail' }],
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
      mapDrinks.mockReturnValue([{ id: '1', name: 'Mocktail' }]);

      await store.getCocktails('mockCode');
      expect(store.loadingState).toBe('success');
    });
  });
});
