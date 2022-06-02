import { Axios } from 'axios';
import { Headers } from '@lucassith/http-constants';

export function axiosConfigure(axios: Axios) {
  axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
  axios.defaults.headers.common[Headers.ACCEPT] = 'application/vnd.github.v3+json';
}
