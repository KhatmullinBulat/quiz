<template>
    <router-link
        :to="{ name: 'home' }"
        class="text-xl text-blue-600 hover:text-blue-800 transition-colors flex items-center group"
        title="На главную"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 group-hover:scale-110 transition-transform"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span class="hidden sm:inline">На главную</span>
      </router-link>
    <div class="bg-white shadow-lg rounded-xl p-4 w-full text-xl relative">
        <pre class="line-numbers rounded bg-gray-900 text-white p-4 mb-4 overflow-x-auto text-lg">
            <code :class="'language-html'" ref="codeEl">{{ foo }}</code>
        </pre>
    </div>
</template>

<script lang="ts" setup>
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import { foo } from '@/data/foo'
import { onMounted, ref, watch } from 'vue'

const codeEl = ref<HTMLElement | null>(null)

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

}

:deep(.line-numbers) .line-numbers-rows {
    left: -11em !important;
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