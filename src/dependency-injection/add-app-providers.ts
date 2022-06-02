import { App, InjectionKey } from 'vue';

export declare type Provider<T> = { key: InjectionKey<T>, value: T };

export function addAppProviders(app: App<Element>, providers: Provider<unknown>[]) {
  providers.forEach(x => app.provide(x.key, x.value));
}
