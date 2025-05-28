<template>
  <pre :class="`language-${language}`" ref="codeBlockRef"><code :class="`language-${language}`">{{ processedCode }}</code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import Prism from 'prismjs';

const props = defineProps<{
  code: string;
  language: string;
}>();

const codeBlockRef = ref<HTMLPreElement | null>(null);

// Убираем лишние отступы в начале строк, если они есть у всего блока
const processedCode = computed(() => {
  const lines = props.code.split('\n');
  if (lines.length <= 1) return props.code;

  // Убираем пустые строки в начале и конце для корректного определения отступа
  let firstNonEmptyLine = -1;
  let lastNonEmptyLine = -1;

  for(let i=0; i < lines.length; i++) {
    if (lines[i].trim() !== '') {
      if (firstNonEmptyLine === -1) firstNonEmptyLine = i;
      lastNonEmptyLine = i;
    }
  }

  if (firstNonEmptyLine === -1) return props.code; // Весь код пустой или из пробелов

  const relevantLines = lines.slice(firstNonEmptyLine, lastNonEmptyLine + 1);

  const minIndent = relevantLines.reduce((min, line) => {
    if (line.trim() === '') return min; // Игнорируем пустые строки при подсчете отступа
    const match = line.match(/^\s*/);
    const indentLength = match ? match[0].length : 0;
    return Math.min(min, indentLength);
  }, Infinity);

  return relevantLines.map(line => line.substring(minIndent)).join('\n');
});

const highlightCode = async () => {
  await nextTick(); // Ждем обновления DOM
  if (codeBlockRef.value) {
    Prism.highlightElement(codeBlockRef.value.querySelector('code') as HTMLElement);
  }
};

onMounted(() => {
  highlightCode();
});

watch(() => [props.code, props.language], () => {
  highlightCode();
});
</script>

<style scoped>
/* Стили для pre и code уже должны быть в main.css из-за Prism.js темы */
pre {
  @apply bg-slate-800 rounded-md shadow-lg my-4 text-sm; /* Дополнительные Tailwind стили */
  white-space: pre-wrap; /* Для переноса длинных строк кода */
  word-break: break-all; /* Чтобы слова тоже переносились если нужно */
}
code {
   font-family: 'Fira Code', 'Consolas', 'Monaco', monospace; /* Предпочтительный шрифт для кода */
   font-size: 21px;
}
</style>