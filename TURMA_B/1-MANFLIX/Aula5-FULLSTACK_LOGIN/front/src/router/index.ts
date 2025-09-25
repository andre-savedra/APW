import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: LoginView,
      name: "login",
      meta: {
        auth: false,
      },
    },
    {
      path: "/home",
      component: HomeView,
      name: "home",
      meta: {
        auth: true,
      },
    },
    {
      component: NotFoundView,
      path: "/:pathMatch(.*)*",
      name: "not-found",
      meta: {
        auth: false,
      },
    }
  ],
})

export default router
