// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/QuizView.vue'
import { questions } from '@/data/questions' // Import questions to get the first ID

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // If navigating to /quiz directly, redirect to the first question
      path: '/quiz',
      redirect: () => {
        // Ensure there's at least one question
        if (questions.length > 0) {
          return { name: 'quiz-question', params: { questionId: questions[0].id.toString() } }
        }
        // Fallback if no questions, though ideally HomeView would handle this
        return { name: 'home' }
      }
    },
    {
      path: '/quiz/:questionId', // Dynamic segment for question ID
      name: 'quiz-question',      // New name for the route
      component: QuizView,
      props: true // Pass route params as props (optional, we'll use useRoute)
    },
  ],
})

export default router