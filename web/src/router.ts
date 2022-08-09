import { createRouter, createWebHashHistory } from 'vue-router';

import Landing from './pages/Landing.vue';
import Menu from './pages/Menu.vue';
import Dashboard from './pages/Dashboard.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', component: Landing },
  { path: '/menu', component: Menu },
  { path: '/dashboard', component: Dashboard },
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
