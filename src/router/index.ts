import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

const isServer = typeof window === 'undefined';

let history = isServer ? createMemoryHistory() : createWebHistory();

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* index */ '@/pages/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue')
  }
];

export function _createRouter() {
  return createRouter({ routes, history });
}
