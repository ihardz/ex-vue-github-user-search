import { Provider, SYMBOL_GITHUB_USER_SEARCH_SERVICE } from '.';
import { GithubUserSearchService } from '@/services/github/implementation';
import { GithubUserSearchServiceInterface } from '@/services/github';

const GITHUB_USER_SEARCH_SERVICE_PROVIDER: Provider<GithubUserSearchServiceInterface> = {
  key: SYMBOL_GITHUB_USER_SEARCH_SERVICE,
  value: new GithubUserSearchService()
};

export const APP_PROVIDERS: Provider<unknown>[] = [
  GITHUB_USER_SEARCH_SERVICE_PROVIDER
];
