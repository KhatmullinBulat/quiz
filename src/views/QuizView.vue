<template>
    <div class="relative flex justify-center items-center min-h-screen bg-gray-100 px-4 py-16"> <!-- Added py-16 for top/bottom padding -->
      <!-- Кнопка Домой -->
      <router-link
        :to="{ name: 'home' }"
        class="absolute top-4 left-4 md:left-12 text-xl text-blue-600 hover:text-blue-800 transition-colors flex items-center group"
        title="На главную"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 group-hover:scale-110 transition-transform"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span class="hidden sm:inline">На главную</span>
      </router-link>
  
      <!-- Кнопка Назад -->
      <button
        @click="prevQuestion"
        :disabled="!canGoPrev"
        class="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-3xl text-blue-600 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ◀
      </button>
  
      <!-- Контент вопроса -->
      <transition name="slide-fade" mode="out-in">
        <QuestionCard
          v-if="currentQuestion"
          :key="currentQuestion.id"
          :question="currentQuestion"
          @next="nextQuestion"
        />
        <div v-else class="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full text-xl text-center">
          <p v-if="questions.length > 0">Загрузка вопроса или вопрос не найден...</p>
          <p v-else>Нет доступных вопросов.</p>
        </div>
      </transition>
  
      <!-- Кнопка Вперёд -->
      <button
        @click="nextQuestion"
        :disabled="!canGoNext"
        class="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-3xl text-blue-600 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ▶
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed, onMounted } from 'vue'
  import { useRoute, useRouter, RouterLink } from 'vue-router' // Import RouterLink if not auto-imported
  import { questions, type Question } from '@/data/questions'
  import QuestionCard from '@/components/QuestionCard.vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const currentIndex = ref(0)
  const currentQuestion = ref<Question | null>(null)
  
  function findQuestionIndexById(id: number): number {
    return questions.findIndex(q => q.id === id)
  }
  
  function updateQuestionFromRoute() {
    if (questions.length === 0) {
      currentQuestion.value = null;
      // router.replace({ name: 'home' }); // Optionally redirect if no questions
      return;
    }
  
    const routeQuestionId = parseInt(route.params.questionId as string, 10)
  
    if (isNaN(routeQuestionId)) {
      router.replace({ name: 'quiz-question', params: { questionId: questions[0].id.toString() } })
      return
    }
  
    const foundIndex = findQuestionIndexById(routeQuestionId)
  
    if (foundIndex !== -1) {
      currentIndex.value = foundIndex
      currentQuestion.value = questions[foundIndex]
    } else {
      console.warn(`Question with ID ${routeQuestionId} not found. Redirecting to first question.`);
      currentQuestion.value = questions[0];
      currentIndex.value = 0;
      router.replace({ name: 'quiz-question', params: { questionId: questions[0].id.toString() } })
    }
  }
  
  const canGoNext = computed(() => {
      if (!currentQuestion.value || questions.length === 0) return false;
      return currentIndex.value < questions.length - 1;
  });
  
  const canGoPrev = computed(() => {
      if (!currentQuestion.value || questions.length === 0) return false;
      return currentIndex.value > 0;
  });
  
  
  function navigateToQuestionByIndex(index: number) {
    if (index >= 0 && index < questions.length) {
      currentIndex.value = index
      currentQuestion.value = questions[index]
      // Use replace to not pollute history too much with internal quiz navigation
      // if user explicitly uses prev/next buttons.
      // Use push if you want each question in browser history.
      router.push({ name: 'quiz-question', params: { questionId: questions[index].id.toString() } })
    }
  }
  
  function nextQuestion() {
    if (canGoNext.value) {
      navigateToQuestionByIndex(currentIndex.value + 1)
    } else if (questions.length > 0 && currentIndex.value === questions.length - 1) {
      // At the last question, you might want to navigate to a results page
      // or loop back to the first question. For now, let's just log it.
      console.log("End of quiz reached.");
      // Example: navigateToQuestionByIndex(0); // Loop to first
    }
  }
  
  function prevQuestion() {
    if (canGoPrev.value) {
      navigateToQuestionByIndex(currentIndex.value - 1)
    }
  }
  
  watch(() => route.params.questionId, (newId, oldId) => {
    if (route.name === 'quiz-question' && newId && newId !== oldId) { // Ensure newId is present
      updateQuestionFromRoute()
    }
  })
  
  onMounted(() => {
    updateQuestionFromRoute()
  })
  </script>
  
  <style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>