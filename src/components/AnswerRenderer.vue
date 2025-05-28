<template>
  <div class=" text-2xl prose prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-sm prose-code:px-1 prose-code:py-0.5 prose-code:bg-slate-700 prose-code:rounded">
    <template v-for="(part, index) in parsedContent" :key="index">
      <span v-if="part.type === 'text'" v-html="part.content"></span>
      <CodeBlock v-if="part.type === 'code'" :code="part.content" :language="part.language || 'plaintext'" class="my-2" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CodeBlock from './CodeBlock.vue';

const props = defineProps<{
  answerText: string;
  isAnswerPureCode?: boolean;
  codeLanguage?: string;
}>();

interface ContentPart {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

const parsedContent = computed<ContentPart[]>(() => {
  if (props.isAnswerPureCode) {
    return [{ type: 'code', content: props.answerText, language: props.codeLanguage || 'plaintext' }];
  }

  const parts: ContentPart[] = [];
  const regex = /```(\w*)\n([\s\S]*?)\n```|([^`]+|`[^`]+`)/g;
  // (\w*) - язык (опционально)
  // ([\s\S]*?) - сам код
  // ([^`]+|`[^`]+`) - текст или inline code

  let lastIndex = 0;
  let match;

  const textToParse = props.answerText;

  while ((match = regex.exec(textToParse)) !== null) {
    const fullMatch = match[0];
    const language = match[1];
    const codeBlockContent = match[2];
    const textOrInlineCode = match[3];

    // Текст перед текущим совпадением
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: convertNewlinesToBr(textToParse.substring(lastIndex, match.index)) });
    }

    if (codeBlockContent) { // Блок кода ```...```
      parts.push({ type: 'code', content: codeBlockContent.trim(), language: language || 'plaintext' });
    } else if (textOrInlineCode) { // Обычный текст или `inline code`
      parts.push({ type: 'text', content: convertNewlinesToBr(textOrInlineCode) });
    }
    lastIndex = regex.lastIndex;
  }

  // Оставшийся текст после последнего совпадения
  if (lastIndex < textToParse.length) {
    parts.push({ type: 'text', content: convertNewlinesToBr(textToParse.substring(lastIndex)) });
  }

  // Если ничего не нашлось (например, пустая строка или строка без спец. форматирования)
  if (parts.length === 0 && textToParse.length > 0) {
     parts.push({ type: 'text', content: convertNewlinesToBr(textToParse) });
  }


  return parts;
});

function convertNewlinesToBr(text: string): string {
  return text.replace(/\n/g, '<br>');
}

</script>

<style>
/* Стили для .prose уже должны быть настроены Tailwind, если установлен @tailwindcss/typography */
/* Если нет, добавьте плагин: npm install -D @tailwindcss/typography */
/* и в tailwind.config.js: plugins: [require('@tailwindcss/typography')], */
/* .prose-pre:bg-transparent и .prose-pre:p-0 нужны, чтобы CodeBlock.vue сам управлял фоном и паддингом pre */
</style>