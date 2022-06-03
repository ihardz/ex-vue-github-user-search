
import { App } from 'vue';
import PrimeVue from 'primevue/config';
import DataView from 'primevue/dataview';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import { DelayedInputText } from '@/components/common';

export function globalComponentsConfigure(app: App<Element>): void {
  _primeVueConfigure(app);
  _customConfigure(app);
}

function _primeVueConfigure(app: App<Element>): void {
  app.use(PrimeVue);
  app.component('DataView', DataView);
  app.component('InputText', InputText);
  app.component('Avatar', Avatar);
}

function _customConfigure(app: App<Element>): void {
  app.component('DelayedInputText', DelayedInputText);
}
