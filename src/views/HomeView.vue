<template>
    <div class="text-center p-6">
      <h1 class="text-3xl font-bold mb-4">Добро пожаловать в тест!</h1>
      <router-link
        v-if="firstQuestionId !== null"
        :to="{ name: 'quiz-question', params: { questionId: firstQuestionId } }"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Начать тест
      </router-link>
      <p v-else class="text-red-500">
        Нет доступных вопросов для начала теста.
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { questions } from '@/data/questions';
  
  const firstQuestionId = computed(() => {
    return questions.length > 0 ? questions[0].id.toString() : null;
  });
  </script>