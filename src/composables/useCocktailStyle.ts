import { watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Enables background transition when route changes
 */
export const useCocktailStyle = () => {
  const route = useRoute();

  watch(
    () => route.params.code,
    (code, oldCode) => {
      if (oldCode) {
        document.body.classList.remove(oldCode as string);
      }

      if (code) {
        document.body.classList.add(code as string);
      }
    },
    { immediate: true },
  );
};
