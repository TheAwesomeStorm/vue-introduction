import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue';
import { createApp } from 'vue';
import { router } from '@/router';
import { store, storeStateKey } from '@/store';

createApp(App)
    .use(router)
    .use(store, storeStateKey)
    .mount('#app');
