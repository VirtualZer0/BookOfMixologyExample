import 'normalize.css';
import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { LoadWhenVisible } from './directives/LoadWhenVisible';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('load-when-visible', LoadWhenVisible);

app.mount('#app');
