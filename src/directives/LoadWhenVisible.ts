import type { Directive } from 'vue';

/**
 * Directive to load images when they are visible
 */
export const LoadWhenVisible: Directive = {
  mounted(el: HTMLImageElement) {
    el.classList.add('shake');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const img = entry.target as HTMLImageElement;
        if (entry.isIntersecting) {
          if (img.dataset.url) {
            img.src = img.dataset.url;
            img.onload = () => {
              img.classList.remove('shake');
            };
            observer.unobserve(el);
          }
        }
      });
    });
    observer.observe(el);
  },
};
