import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { axiosConfigure, globalComponentsConfigure } from './config';
import { addAppProviders, APP_PROVIDERS } from './dependency-injection';

const app = createApp(App).use(router);

globalComponentsConfigure(app);
axiosConfigure(axios);
addAppProviders(app, APP_PROVIDERS);

app.mount('#app');
