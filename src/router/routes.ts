import { RouteRecordRaw } from 'vue-router';
import { GithubUserSearchView } from '@/views';

export const ROUTES: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'github-user-search',
    component: GithubUserSearchView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
];
