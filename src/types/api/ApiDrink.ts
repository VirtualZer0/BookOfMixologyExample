import type { StringRange } from '../helpers/StringRange';

const langs = ['ES', 'DE', 'FR', 'IT', 'ZH-HANS', 'ZH-HANT'] as const;

export type ApiDrinkIngredients = {
  [K in `strIngredient${StringRange<15>[number]}`]?: string | undefined | null;
};

export type ApiDrinkMeasures = {
  [K in `strMeasure${StringRange<15>[number]}`]?: string | undefined | null;
};

export type ApiDrinkInstructions = {
  [K in `strInstructions${(typeof langs)[number]}`]?: string | undefined | null;
};

export interface ApiBaseDrink {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: any;
  strTags?: string;
  strVideo: any;
  strCategory: string;
  strIBA?: string;
  strAlcoholic: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
  strImageSource?: string;
  strImageAttribution?: string;
  strCreativeCommonsConfirmed: string;
  dateModified?: string;
}

export type ApiDrink = ApiBaseDrink & ApiDrinkIngredients & ApiDrinkMeasures & ApiDrinkInstructions;

export interface ApiDrinkList {
  drinks: ApiDrink[] | null;
}
