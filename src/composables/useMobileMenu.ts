import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * Helper composable to toggle the mobile menu
 */
export const useMobileMenu = () => {
  const showMobileMenu = ref(false);

  const innerWidth = ref(window.innerWidth);

  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
  };

  const isMobile = computed(() => innerWidth.value < 720);

  const updateWidth = () => {
    innerWidth.value = window.innerWidth;
  };

  onMounted(() => window.addEventListener('resize', updateWidth));
  onBeforeUnmount(() => window.removeEventListener('resize', updateWidth));

  return {
    showMobileMenu,
    toggleMobileMenu,
    isMobile,
  };
};
