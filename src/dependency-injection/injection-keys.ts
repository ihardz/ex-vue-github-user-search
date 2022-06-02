import { InjectionKey} from 'vue';
import { GithubUserSearchServiceInterface } from '@/services/github';

export const SYMBOL_GITHUB_USER_SEARCH_SERVICE: InjectionKey<GithubUserSearchServiceInterface> = Symbol('SYMBOL_GITHUB_USER_SEARCH_SERVICE');