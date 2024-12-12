import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index.vue';
import Cocktail from '@/views/Cocktail.vue';
import { cocktailCodes } from '@/utils/cocktailCodes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Index,
      beforeEnter: (to, from, next) => {
        if (!to.params.code) {
          next({ name: 'cocktail', params: { code: cocktailCodes[0] } });
        } else {
          next();
        }
      },
      children: [
        {
          path: '/:code',
          name: 'cocktail',
          component: Cocktail,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
