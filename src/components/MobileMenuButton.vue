<template>
  <button class="mobile-menu-button" @click="emit('click', $event)">
    <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>close</title>
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" v-else>
      <title>menu</title>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>
  </button>
</template>
<script lang="ts" setup>
const emit = defineEmits(['click']);
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
.mobile-menu-button {
  position: fixed;
  right: var(--block-gap);
  bottom: var(--block-gap);
  width: 64px;
  height: 64px;
  border: none;
  padding: 12px;
  border-radius: 100%;
  background: var(--main-color);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
