

<template>
  <div class="github-user-search-view">
    <GithubUserList :users="users" @search="handleSearch" :totalCount="totalCount"
      :hasPreviousPage="hasPreviousPage" :hasNextPage="hasNextPage" :pageSizes="pageSizes"
      @page="handlePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GithubUserList, GithubUserListSearchPageEvent, GithubUserListSearchEvent } from '@/components/github';
import { SYMBOL_GITHUB_USER_SEARCH_SERVICE } from '@/dependency-injection';
import { GithubSearchUserCollectionModel, GithubSearchUserModel, GithubUserSearchNextPageOptions, 
  GithubUserSearchPaginationOptions, GithubUserSearchPaginationOptionsAbstract, GithubUserSearchPreviousPageOptions } from '@/services/github';
import { GITHUB_USER_SEARCH_PAGE_SIZES } from '@/constants';

export default defineComponent({
  setup() {   
    const githubSearchUserService = inject(SYMBOL_GITHUB_USER_SEARCH_SERVICE);
    if(!githubSearchUserService) {
      throw new Error('[GithubUserSearchView.vue] GithubUserSearchServiceInterface provider not found.');
    }
    return { 
      githubSearchUserService
    };
  },
  components: {
    GithubUserList
  },
  data(): {
    userCollection?: GithubSearchUserCollectionModel,
    loading: boolean,
    pageSizes: number[]
  } {
    return {
      userCollection: undefined,
      loading: false,
      pageSizes: GITHUB_USER_SEARCH_PAGE_SIZES
    };
  },
  computed: {
    users(): GithubSearchUserModel[] | undefined {
      return this.userCollection?.items;
    },
    totalCount(): number | undefined {
      return this.userCollection?.totalCount;
    },
    hasNextPage(): boolean {
      return this.userCollection?.hasNextPage || false;
    },
    hasPreviousPage(): boolean {
      return this.userCollection?.hasPreviousPage || false;
    }
  },
  methods: {
    async handleSearch({ term , pageSize }: GithubUserListSearchEvent): Promise<void> {
      await this._loadPage(term , pageSize);
    },
    async handlePage({ term , pageSize, isNext }: GithubUserListSearchPageEvent): Promise<void> {
      if(!this.userCollection) return;
      await this._loadPage(term , pageSize, isNext);
    },
    async _loadPage(term: string | undefined, pageSize: number, isNext?: boolean): Promise<void> {
      if(!term) return;
      this.loading = true;
      const options = this._createPageCursorOptions(pageSize, isNext);
      this._resetSearchResults();
      this.userCollection = await this.githubSearchUserService.searchUsers(term, options);
      this.loading = false;
    },
    _createPageCursorOptions(pageSize: number, isNext?: boolean): GithubUserSearchPaginationOptionsAbstract {
      let options: GithubUserSearchPaginationOptionsAbstract;
      switch(isNext) {
        case true: {
          const cursor = this.userCollection?.endCursor;
          if(!cursor) throw new Error('endCursor not defined.');
          options = new GithubUserSearchNextPageOptions(pageSize, cursor);
          break;
        }          
        case false: {
          const cursor = this.userCollection?.startCursor;
          if(!cursor) throw new Error('startCursor not defined.');
          options = new GithubUserSearchPreviousPageOptions(pageSize, cursor);
          break;
        }          
        default: 
          options = new GithubUserSearchPaginationOptions(pageSize);             
      }      
      return options;
    },
    _resetSearchResults(): void {
      this.userCollection = undefined;
    }
  }
});
</script>