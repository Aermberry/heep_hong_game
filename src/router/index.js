import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/game/intro',
    name: 'Game Intro',
    component: () => import('../views/GameIntro.vue')
  },
  {
    path: '/gameDemo',
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
    path: '/important-notices',
    name: 'Important Notices',
    component: () => import('../views/ImportantNotices.vue')
  },
  {
    path: '/privacy-policy',
    name: 'Privacy Policy',
    component: () => import('../views/PrivacyPolicy.vue')
  },
  {
    path: '/sitemap',
    name: 'Sitemap',
    component: () => import('../views/Sitemap.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

