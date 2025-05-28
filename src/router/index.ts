// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChapterView from '../views/ChapterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chapter/:chapterSlug', // Используем chapterSlug
      name: 'chapter',
      component: ChapterView,
      // props: true // Можно передавать route.params как props, но мы уже используем useRoute()
    },
    // Редирект на главную для несуществующих путей
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  // Прокрутка к верху страницы при смене маршрута
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router