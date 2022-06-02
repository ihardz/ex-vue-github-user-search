import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import axios from 'axios';
import { axiosConfigure } from './config';
import { addAppProviders, APP_PROVIDERS } from './dependency-injection';

const app = createApp(App);
app.use(router);

app.use(PrimeVue);
axiosConfigure(axios);
addAppProviders(app, APP_PROVIDERS);

app.mount('#app');
