<template>
  <div class="cocktail-card">
    <div class="cocktail-card__header">
      <div class="cocktail-card__info">
        <h2 class="cocktail-card__name">
          {{ cocktail.name }}
        </h2>

        <div class="cocktail-card__categories">
          <div class="cocktail-card__category-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="currentColor">
              <path
                d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z"
              />
            </svg>
            <b>{{ cocktail.category }}</b>
          </div>

          <div class="cocktail-card__category-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="currentColor">
              <path
                d="M7.2,11.2C8.97,11.2 10.4,12.63 10.4,14.4C10.4,16.17 8.97,17.6 7.2,17.6C5.43,17.6 4,16.17 4,14.4C4,12.63 5.43,11.2 7.2,11.2M14.8,16A2,2 0 0,1 16.8,18A2,2 0 0,1 14.8,20A2,2 0 0,1 12.8,18A2,2 0 0,1 14.8,16M15.2,4A4.8,4.8 0 0,1 20,8.8C20,11.45 17.85,13.6 15.2,13.6A4.8,4.8 0 0,1 10.4,8.8C10.4,6.15 12.55,4 15.2,4Z"
              />
            </svg>
            <b>{{ cocktail.alcoholic }}</b>
          </div>

          <div class="cocktail-card__category-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" fill="currentColor">
              <path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z" />
            </svg>
            <b>{{ cocktail.glass }}</b>
          </div>
        </div>
      </div>

      <div class="cocktail-card__image">
        <img :data-url="cocktail.thumbnail" src="/placeholder.svg" v-load-when-visible />
      </div>
    </div>

    <div class="cocktail-card__instructions">
      <h3>Instructions</h3>
      <p>{{ cocktail.instructions }}</p>
    </div>

    <div class="cocktail-card__ingredients">
      <h3>List of ingredients</h3>
      <div class="cocktail-card__ingredients-list">
        <CocktailIngredient :ingredient="ingredient" v-for="(ingredient, num) in cocktail.ingredients" :key="num" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MappedDrink } from '@/types/MappedDrink';
import type { PropType } from 'vue';
import CocktailIngredient from './CocktailIngredient.vue';

const props = defineProps({
  cocktail: {
    type: Object as PropType<MappedDrink>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.cocktail-card {
  width: 100%;
  background: var(--bg-color);
  padding: var(--inner-gap);
  border-radius: var(--block-radius);

  &__header {
    display: flex;
    justify-content: space-between;

    @media (max-width: 480px) {
      flex-direction: column-reverse;
      gap: var(--inner-gap);
    }
  }

  &__name {
    margin: 0;
    margin-bottom: var(--block-gap);
  }

  &__image {
    width: 220px;
    height: 220px;

    @media (max-width: 480px) {
      width: 100%;
    }

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: var(--block-radius);
    }
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__category-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__instructions {
    margin-bottom: 2.5rem;
  }

  &__ingredients {
    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>
