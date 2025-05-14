<template>
  <div class="bg-white shadow-lg rounded-xl p-6 max-w-7xl w-full text-xl relative">

    <h2 class="text-4xl font-bold mb-4 leading-snug">{{ question.id }}. {{ question.question }}</h2>

    <!-- Блок кода -->
    <pre v-if="question.code" class="line-numbers rounded bg-gray-900 text-white p-4 mb-4 overflow-x-auto text-lg">
      <code :class="'language-' + getLang" ref="codeEl">{{ question.code }}</code>
    </pre>

    <!-- Варианты ответа -->
    <div v-if="question.type === 'choice'" class="space-y-4">
      <button v-for="(opt, index) in question.options" :key="index" @click="selectAnswer(index)"
        :disabled="correctAnswered" :class="[
          'w-full py-3 px-8 text-left rounded-lg border text-2xl transition-all duration-300',
          selectedAnswer !== null ? getButtonClass(index) : 'border-gray-300'
        ]">
        {{ opt }}
      </button>
    </div>

    <!-- Аккордеон -->
    <div v-else-if="question.type === 'accordion'" class="mt-6">
      <button class="text-blue-600 text-2xl underline hover:text-blue-800" @click="showExplanation = !showExplanation">
        {{ showExplanation ? 'Скрыть' : 'Показать' }} ответ
      </button>
      <transition name="fade">
        <p v-if="showExplanation" class="mt-6 p-5 rounded-lg border bg-blue-50 text-2xl leading-relaxed" style="white-space: pre-line;">
          {{ question.explanation }}
        </p>
      </transition>
    </div>

    <div v-else-if="question.type === 'last'" class="mt-6 text-center">
      <img v-if="question.img" :src="question.img" alt="Завершающее изображение"
        class="w-full h-full shadow-md mx-auto object-contain mb-2" />
        <a href="https://www.figma.com/design/qGDhl4j0NqLLz1n6FL2Lpf/blanko--Copy-?node-id=2031-3&t=hyVjaFBtLhxLpusl-0">figma</a>
        <RouterLink :to="{name: 'my-code'}">Мое</RouterLink>
    </div>

    <!-- Fallback для неизвестного типа вопроса -->
    <div v-else class="mt-6 p-5 rounded-lg border bg-red-100 text-red-700">
      <p>Ошибка: Неизвестный тип вопроса.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { questions, type Question } from '@/data/questions'
import { RouterLink } from 'vue-router'

const props = defineProps<{ question: Question }>()
const emit = defineEmits(['next'])

const codeEl = ref<HTMLElement | null>(null)
const selectedAnswer = ref<number | null>(null)
const correctAnswered = ref(false)
const showExplanation = ref(false)

const getLang = computed(() => {
  if ('lang' in props.question && props.question.lang) {
    return props.question.lang
  }
  return 'javascript'
})

function selectAnswer(index: number) {
  if (props.question.type !== 'choice') return
  if (correctAnswered.value) return

  selectedAnswer.value = index

  if (index === props.question.correctAnswer) {
    correctAnswered.value = true
    setTimeout(() => {
      emit('next')
      resetState()
    }, 1000)
  }
}

function getButtonClass(index: number): string {
  if (props.question.type !== 'choice') return ''

  const isSelected = selectedAnswer.value === index
  const isCorrect = props.question.correctAnswer === index

  if (isSelected && isCorrect) return 'bg-green-100 border-green-500'
  if (isSelected && !isCorrect) return 'bg-red-100 border-red-500'
  return 'hover:bg-blue-50 border-gray-300'
}

function resetState() {
  selectedAnswer.value = null
  correctAnswered.value = false
  showExplanation.value = false
}

function formatExplanation(text: string): string {
    return text.replace(/\n/g, '<br>');
}

watch(() => codeEl.value, () => {
  if (codeEl.value) Prism.highlightElement(codeEl.value)
})

onMounted(() => {
  if (codeEl.value) Prism.highlightElement(codeEl.value)
})
</script>

<style scoped>
:deep(pre[class*="language-"]),
:deep(code[class*="language-"]) {
  font-size: 1.8rem !important;

  padding-left: 20px;
}

:deep(.line-numbers) .line-numbers-rows {
  left: -4.8em !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
