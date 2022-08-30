import { createRouter, createWebHashHistory } from 'vue-router';

// User
import Landing from './pages/Landing.vue';
import Menu from './pages/Menu.vue';
import MyOrders from './pages/MyOrders.vue';

// Adm
import AllOrders from './pages/adm/AllOrders.vue';
import Ingredients from './pages/adm/Ingredients.vue';
import Items from './pages/adm/Items.vue';

import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', component: Landing },
  { path: '/menu', component: Menu },
  { path: '/my-orders', component: MyOrders },

  { path: '/adm/all-orders', component: AllOrders },
  { path: '/adm/ingredients', component: Ingredients },
  { path: '/adm/items', component: Items },

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
