<template>
  <li class="cocktail-ingredient">
    <span v-if="ingredient.measure" class="cocktail-ingredient__measure">{{ ingredient.measure }}</span>
    <span class="cocktail-ingredient__name">{{ ingredient.name }}</span>
  </li>
</template>

<script lang="ts" setup>
import type { MappedDrinkIngredient } from '@/types/MappedDrink';
import type { PropType } from 'vue';

defineProps({
  ingredient: {
    type: Object as PropType<MappedDrinkIngredient>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.cocktail-ingredient {
  display: inline;
  width: auto;
  list-style-type: none;
  border: var(--main-color) 2px solid;
  padding: 0.5rem 1rem;
  border-radius: 12px;

  &__measure {
    margin-right: 4px;
  }

  &__name {
    font-weight: bold;
  }
}
</style>
