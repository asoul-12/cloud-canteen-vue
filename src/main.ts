import { createApp } from 'vue';
import router from 'routes/router';
import App from './App.vue';
import { createPinia } from 'pinia';

import 'tdesign-vue-next/es/style/index.css';

createApp(App).use(router).use(createPinia()).mount('#app');
