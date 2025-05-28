<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <router-view v-slot="{ Component, route }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <footer class="py-6 text-center text-slate-500 text-sm">
      <p>© {{ new Date().getFullYear() }} Булат. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Можно добавить глобальные вещи здесь, если нужно
</script>

<style>
/* Анимации для смены страниц */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* Стили для шрифта Inter, если вы его подключили */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

/* Базовые стили для ссылок, если нужно */
a {
  /* @apply text-sky-400 hover:text-sky-300 transition-colors; */
  /* Это может конфликтовать с другими стилями ссылок, можно убрать */
}
</style>