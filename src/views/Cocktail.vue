<template>
  <main class="cocktail-page" v-if="menuStore.loadingState == 'success'">
    <div class="cocktail-page__list">
      <CocktailCard v-for="cocktail in cocktailList" :cocktail="cocktail" :key="cocktail.id" />
    </div>
  </main>
  <CocktailLoader v-else />
</template>
<script lang="ts" setup>
import CocktailCard from '@/components/CocktailCard.vue';
import { useMenuStore } from '@/stores/menu';
import { useRoute } from 'vue-router';
import { cocktailCodes } from '@/utils/cocktailCodes';
import { ref, type Ref } from 'vue';
import type { MappedDrink } from '@/types/MappedDrink';
import CocktailLoader from '@/components/CocktailLoader.vue';

const route = useRoute();
const menuStore = useMenuStore();
const cocktailCode = (route.params.code || cocktailCodes[0]) as (typeof cocktailCodes)[number];
const cocktailList: Ref<MappedDrink[]> = ref([]);

try {
  cocktailList.value = await menuStore.getCocktails(cocktailCode);
} catch (e) {
  cocktailList.value = [];
}
</script>
<style lang="scss" scoped>
.cocktail-page {
  width: 100%;

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--block-gap);
  }
}
</style>
