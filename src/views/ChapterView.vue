<template>
  <div class="container mx-auto px-4 py-12" v-if="chapter">
    <header class="mb-10 text-center">
      <router-link to="/" class="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors mb-4 group">
        <ArrowLeftIcon class="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Назад к списку глав
      </router-link>
      <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2">
        {{ chapter.title }}
      </h1>
      <p class="text-lg text-slate-400">
        Вопрос {{ currentQuestionIndex + 1 }} из {{ chapter.questions.length }}
      </p>
    </header>

    <div v-if="currentQuestion" class="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn">
      <h2 class="text-2xl sm:text-3xl font-semibold text-slate-100 mb-6 leading-tight">
        {{ currentQuestion.id }}. {{ currentQuestion.titleParts.text }}
      </h2>

      <CodeBlock v-if="currentQuestion.titleParts.code" :code="currentQuestion.titleParts.code" :language="currentQuestion.titleParts.language || 'plaintext'" class="my-2" />

      <button
        @click="toggleAnswer"
        class="w-full mb-6 px-6 py-3 text-left text-lg font-medium rounded-lg transition-all duration-300 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
        :class="isAnswerVisible ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-sky-300'"
      >
        <span>{{ isAnswerVisible ? 'Скрыть ответ' : 'Показать ответ' }}</span>
        <ChevronDownIcon class="h-6 w-6 transition-transform duration-300" :class="{ 'transform rotate-180': isAnswerVisible }" />
      </button>

      <Transition
        name="expand"
        @enter="onAnswerEnter"
        @leave="onAnswerLeave"
      >
        <div v-if="isAnswerVisible" class="overflow-hidden">
          <div class="pb-1">
            <AnswerRenderer
              :answerText="currentQuestion.answer.text"
              :isAnswerPureCode="currentQuestion.answer.isCode"
              :codeLanguage="currentQuestion.answer.language"
            />
          </div>
        </div>
      </Transition>
    </div>
    <div v-else class="text-center text-slate-400 py-10">
      <p>Вопросы в этой главе не найдены.</p>
    </div>

    <!-- Пагинация -->
    <nav v-if="chapter.questions.length > 0" class="mt-10 flex justify-between items-center animate-fadeIn" style="animation-delay: 0.2s;">
      <button
        @click="prevQuestion"
        :disabled="currentQuestionIndex === 0 && currentChapterIndexGlobal === 0"
        class="inline-flex items-center px-5 py-3 border border-slate-600 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowLeftIcon class="h-5 w-5 mr-2" />
        Предыдущий
      </button>
      <span class="text-slate-400">
        {{ currentQuestionIndex + 1 }} / {{ chapter.questions.length }}
      </span>
      <button
        @click="nextQuestion"
        :disabled="isNextButtonDisabled"
        class="inline-flex items-center px-5 py-3 border border-slate-600 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ nextButtonText }}
        <ArrowRightIcon class="h-5 w-5 ml-2" />
      </button>
    </nav>
  </div>
  <div v-else class="text-center text-xl text-slate-400 py-20">
    Глава не найдена.
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { chapters as chaptersData, type Chapter, type Question } from '@/data/attestationData';
import AnswerRenderer from '@/components/AnswerRenderer.vue';
import { ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid';
import Prism from 'prismjs';
import CodeBlock from '@/components/CodeBlock.vue';

const route = useRoute();
const router = useRouter();

const chapter = computed<Chapter | undefined>(() => {
  return chaptersData.find(c => c.slug === route.params.chapterSlug);
});

const currentChapterIndexGlobal = computed<number>(() => {
  if (!chapter.value) return -1;
  return chaptersData.findIndex(c => c.id === chapter.value!.id);
});

const hasNextChapter = computed<boolean>(() => {
  if (currentChapterIndexGlobal.value === -1 || currentChapterIndexGlobal.value >= chaptersData.length - 1) {
    return false;
  }
  return true;
});

const nextChapterSlug = computed<string | undefined>(() => {
  if (hasNextChapter.value) {
    return chaptersData[currentChapterIndexGlobal.value + 1].slug;
  }
  return undefined;
});


const isLastQuestionInChapter = computed<boolean>(() => {
  if (!chapter.value) return true; // Если главы нет, считаем что последний (кнопка будет disabled)
  return currentQuestionIndex.value === chapter.value.questions.length - 1;
});

const currentQuestionIndex = ref(0);
const isAnswerVisible = ref(false);

const currentQuestion = computed<Question | undefined>(() => {
  return chapter.value?.questions[currentQuestionIndex.value];
});

const nextButtonText = computed(() => {
  if (isLastQuestionInChapter.value) {
    return hasNextChapter.value ? 'Следующая глава' : 'Конец';
  }
  return 'Следующий';
});

const isNextButtonDisabled = computed(() => {
  return isLastQuestionInChapter.value && !hasNextChapter.value;
});

const updateQuestionFromQuery = () => {
  if (route.query.q) {
    const qIndex = parseInt(route.query.q as string, 10) - 1;
    if (chapter.value && qIndex >= 0 && qIndex < chapter.value.questions.length) {
      currentQuestionIndex.value = qIndex;
    } else {
      // Если q некорректный, сбрасываем на первый вопрос и удаляем q из URL
      currentQuestionIndex.value = 0;
      router.replace({ query: {} });
    }
  } else {
    currentQuestionIndex.value = 0; // По умолчанию первый вопрос
  }
};

onMounted(() => {
  updateQuestionFromQuery();
  if (isAnswerVisible.value) {
    nextTick(() => Prism.highlightAll()); // На случай если ответ уже видим при загрузке (например, по q параметру)
  }
});

// Следим за изменением chapterSlug в роуте (если пользователь переходит между главами напрямую по URL)
watch(() => route.params.chapterSlug, () => {
  isAnswerVisible.value = false;
  currentQuestionIndex.value = 0; // Сбрасываем на первый вопрос при смене главы
  updateQuestionFromQuery();
}, { immediate: true }); // immediate: true здесь важно, чтобы currentQuestionIndex сбросился при первой загрузке страницы главы

watch(() => route.query.q, (newQ, oldQ) => {
    if (newQ !== oldQ) {
        updateQuestionFromQuery();
    }
});


function navigateQuestion(newIndex: number) {
  isAnswerVisible.value = false; // Скрываем ответ при переходе
  currentQuestionIndex.value = newIndex;
  router.push({ query: { q: newIndex + 1 } }); // Обновляем URL
  // Подсветка не нужна здесь, так как ответ скрыт
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    navigateQuestion(currentQuestionIndex.value - 1);
  }
}

function toggleAnswer() {
  isAnswerVisible.value = !isAnswerVisible.value;
  if (isAnswerVisible.value) {
    // Даем Vue время отрисовать блок перед подсветкой
    nextTick(() => {
      Prism.highlightAllUnder(document.querySelector('.container') as HTMLElement);
    });
  }
}

function nextQuestion() {
  if (!chapter.value) return;

  if (currentQuestionIndex.value < chapter.value.questions.length - 1) {
    // Переходим к следующему вопросу в текущей главе
    navigateQuestion(currentQuestionIndex.value + 1);
  } else if (hasNextChapter.value && nextChapterSlug.value) {
    // Это был последний вопрос в главе, переходим к следующей главе
    isAnswerVisible.value = false; // Скрываем ответ
    // currentQuestionIndex.value будет сброшен в 0 в watch(() => route.params.chapterSlug)
    router.push({
      name: 'chapter',
      params: { chapterSlug: nextChapterSlug.value },
      query: { q: '1' } // Начинаем с первого вопроса следующей главы
    });
  }
  // Если это последний вопрос последней главы, кнопка будет disabled, и эта функция не должна ничего делать
}

// Анимация для коллапса ответа
const onAnswerEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = '0';
  htmlEl.style.opacity = '0';
  // Заставляем браузер пересчитать стили
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = htmlEl.offsetHeight;
  requestAnimationFrame(() => {
    htmlEl.style.transition = 'max-height 0.4s ease-out, opacity 0.4s ease-out';
    htmlEl.style.maxHeight = htmlEl.scrollHeight + 'px';
    htmlEl.style.opacity = '1';
  });
};

const onAnswerLeave = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.transition = 'max-height 0.4s ease-in, opacity 0.3s ease-in';
  requestAnimationFrame(() => {
    htmlEl.style.maxHeight = '0';
    htmlEl.style.opacity = '0';
  });
  // Убедитесь, что done вызывается после завершения анимации
  setTimeout(done, 400); // Время должно совпадать с transition-duration
};

</script>

<style scoped>
/* Для Transition name="expand" */
.expand-enter-active,
.expand-leave-active {
  /* transition: max-height 0.4s ease-out, opacity 0.3s ease-out; handled by JS for dynamic height */
  overflow: hidden;
}

/* Дополнительная стилизация для кнопок пагинации */
button:disabled {
  @apply bg-slate-800 text-slate-500 cursor-not-allowed;
}
</style>