import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup'; // для HTML
import 'prismjs/components/prism-css';   // для CSS

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
