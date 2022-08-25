import { createRouter, createWebHashHistory } from 'vue-router';

// User
import Landing from './pages/Landing.vue';
import Menu from './pages/Menu.vue';
import MyOrders from './pages/MyOrders.vue';

// Adm
import AllOrders from './pages/adm/AllOrders.vue';
import NewIngredient from './pages/adm/NewIngredient.vue';
import NewItem from './pages/adm/NewItem.vue';

import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', component: Landing },
  { path: '/menu', component: Menu },
  { path: '/my-orders', component: MyOrders },

  { path: '/adm/all-orders', component: AllOrders },
  { path: '/adm/new-ingredient', component: NewIngredient },
  { path: '/adm/new-item', component: NewItem },

  {
    path: '/adm',
    redirect: () => {
      return { path: '/adm/all-orders' };
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
