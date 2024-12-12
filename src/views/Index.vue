<template>
  <AppHeader />
  <main class="main-page">
    <Transition name="main-page__menu">
      <aside class="main-page__list" :class="{ fullscreen: isMobile }" v-if="!isMobile || showMobileMenu">
        <CocktailMenu @selected="toggleMobileMenu" />
      </aside>
    </Transition>
    <div class="main-page__content">
      <RouterView v-slot="{ Component }" :key="$route.path">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <CocktailLoader />
          </template>
        </Suspense>
      </RouterView>
    </div>
    <MobileMenuButton @click="toggleMobileMenu" :isOpen="showMobileMenu" v-if="isMobile" />
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import CocktailLoader from '@/components/CocktailLoader.vue';
import CocktailMenu from '@/components/CocktailMenu.vue';
import MobileMenuButton from '@/components/MobileMenuButton.vue';
import { useCocktailStyle } from '@/composables/useCocktailStyle';
import { useMobileMenu } from '@/composables/useMobileMenu';
import { useMenuStore } from '@/stores/menu';
import { storeToRefs } from 'pinia';

const { isMobile, showMobileMenu, toggleMobileMenu } = useMobileMenu();
const { cocktails, loadingState } = storeToRefs(useMenuStore());

useCocktailStyle();
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  width: 100%;
  gap: var(--block-gap);

  &__list {
    align-self: flex-start;
    width: 30%;
    min-width: 210px;
    position: sticky;
    left: 0;
    top: var(--block-gap);

    &.fullscreen {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      top: unset;
      left: unset;
      width: 100%;
      box-shadow:
        0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
      border-radius: var(--block-radius) var(--block-radius) 0 0;
      background: var(--bg-color);
      padding-bottom: 100px;
    }
  }

  &__content {
    width: calc(70% - var(--block-gap));

    @media (max-width: 720px) {
      width: 100%;
    }
  }

  &__menu {
    &-enter-active,
    &-leave-active {
      transition: transform 0.3s ease;
    }

    &-enter-from,
    &-leave-to {
      transform: translateY(100%);
    }
  }
}
</style>
