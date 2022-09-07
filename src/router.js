import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './layout/default.vue'
import movieService from './service/movie'

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        component: () => import('./pages/Home.vue'),
      },
      {
        path: '/movie/:id',
        component: () => import('./pages/MovieDetails.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const GUEST_SESSION_ID = localStorage.getItem('GUEST_SESSION_ID')

  if (!GUEST_SESSION_ID) {
    const guestSession = await movieService.generateSessionId()
    localStorage.setItem('GUEST_SESSION_ID', guestSession.guest_session_id)
  }
  next()
})

export default router