<template>
  <div class="container mx-auto px-4 py-12">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4 animate-fadeIn">
        Модуль Аттестации
      </h1>
      <p class="text-xl text-slate-400 animate-fadeIn" style="animation-delay: 0.2s;">
        Выберите главу для начала подготовки.
      </p>
    </header>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link
        v-for="(chapter, index) in chaptersData"
        :key="chapter.id"
        :to="`/chapter/${chapter.slug}`"
        class="block p-8 bg-slate-800 hover:bg-slate-700 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-blue-500/30 animate-fadeIn"
        :style="{ animationDelay: `${0.3 + index * 0.1}s` }"
      >
        <h2 class="text-2xl font-semibold text-sky-400 mb-3">{{ chapter.title }}</h2>
        <p class="text-slate-400 text-sm mb-4">
          {{ chapter.questions.length }} {{ getQuestionWord(chapter.questions.length) }}
        </p>
        <div class="flex justify-end">
          <span class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Начать главу
            <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5" />
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chapters as chaptersData } from '@/data/attestationData';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';

function getQuestionWord(count: number): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['вопрос', 'вопроса', 'вопросов'];
  return titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
}
</script>