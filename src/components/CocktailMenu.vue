<template>
  <nav class="cocktail-menu">
    <RouterLink
      class="cocktail-menu__item"
      v-for="code in cocktailCodes"
      :class="[$route.params.code]"
      :key="code"
      :to="code"
      @click="emit('selected', $event)"
    >
      <span class="cocktail-menu__circle" :class="code" />
      <span class="cocktail-menu__text">{{ code }}</span>
    </RouterLink>
  </nav>
</template>
<script lang="ts" setup>
import { cocktailCodes } from '@/utils/cocktailCodes';

const emit = defineEmits(['selected']);
</script>
<style lang="scss" scoped>
.cocktail-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: var(--inner-gap);
  width: 100%;
  background: var(--bg-color);
  border-radius: 16px;

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 12px;
    text-decoration: none;
    border-radius: 8px;
    color: var(--text-color);
    font-weight: 500;
    font-size: 1.1rem;

    &.router-link-active {
      background: var(--main-color);

      .cocktail-menu__circle {
        border-width: 5px;
      }
    }
  }

  &__text::first-letter {
    text-transform: capitalize;
  }

  &__circle {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background: var(--cocktail-color-2);
    border: 0 solid var(--bg-color);
    transition: border-width 0.1s ease;
    will-change: border-width;
  }
}
</style>
