import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView,
      name: "login"
    },
    {
      path: "/home",
      component: HomeView,
      name: "home"
    },
    {
      component: NotFoundView,
      path: "/:pathMatch(.*)*",
      name: "not-found"
    }
  ],
})

export default router
