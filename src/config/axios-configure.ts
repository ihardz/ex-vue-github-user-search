import { Axios } from 'axios';
import { Headers } from '@lucassith/http-constants';

export function axiosConfigure(axios: Axios) {
  axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
  axios.defaults.headers.common[Headers.ACCEPT] = 'application/vnd.github.v3+json';
  // todo: move to server-side proxy header decorator if will have more sensitive scope. now: read:user
  axios.defaults.headers.common[Headers.AUTHORIZATION] = `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`;
}
