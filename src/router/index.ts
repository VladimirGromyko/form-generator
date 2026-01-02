import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DemoSimple from '@/views/DemoSimple.vue'
import DemoComplex from '@/views/DemoComplex.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/simple', name: 'Simple', component: DemoSimple },
  { path: '/complex', name: 'Complex', component: DemoComplex }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
