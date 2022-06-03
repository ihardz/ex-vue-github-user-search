import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import axios from 'axios';
import { axiosConfigure } from './config';
import { addAppProviders, APP_PROVIDERS } from './dependency-injection';
import DataView from 'primevue/dataview';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';

const app = createApp(App);
app.use(router);

app.use(PrimeVue);
app.component('DataView', DataView);
app.component('InputText', InputText);
app.component('Avatar', Avatar);

axiosConfigure(axios);
addAppProviders(app, APP_PROVIDERS);

app.mount('#app');
