import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/game',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/game/intro',
    name: 'Intro',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/game/world-index',
    name: 'Game Intro',
    component: () => import('../views/GameIntro.vue')
  },
  {
    path: '/game/world',
    name: 'Game World',
    component: () => import('../views/GameWorldIndex.vue')
  },
  {
    path: '/game/world/:sid',
    name: 'Game World Stage',
    component: () => import('../views/GameWorldIndex.vue')
  },
  {
    path: '/game/gameDemo',
    name: 'Game Demo',
    component: () => import('../views/GameDemo.vue')
  },
  {
    path: '/game/:id',
    name: 'World',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/game/:id/stage/:sid',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/game/important-notices',
    name: 'Important Notices',
    component: () => import('../views/ImportantNotices.vue')
  },
  {
    path: '/game/privacy-policy',
    name: 'Privacy Policy',
    component: () => import('../views/PrivacyPolicy.vue')
  },
  {
    path: '/game/sitemap',
    name: 'Sitemap',
    component: () => import('../views/Sitemap.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  routes
})

export default router

