

<template>
  <div class="github-user-search-view">
    <GithubUserList :users="users" @search="handleSearch" :totalCount="totalCount" :hasPreviousPage="true"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GithubUserList } from '@/components/github';
import { SYMBOL_GITHUB_USER_SEARCH_SERVICE } from '@/dependency-injection';
import { GithubSearchUserCollectionModel, GithubSearchUserModel } from '@/services/github';

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
    loading: boolean
  } {
    return {
      userCollection: undefined,
      loading: false
    };
  },
  computed: {
    users(): GithubSearchUserModel[] | undefined {
      return this.userCollection?.items;
    },
    totalCount(): number | undefined {
      return this.userCollection?.totalCount;
    }
  },
  methods: {
    async handleSearch(term?: string): Promise<void> {
      this._resetSearchResults;
      if(!term) return;
      this.loading = true;
      this.userCollection = await this.githubSearchUserService.searchUsers(term, 100);
      this.loading = false;
    },
    _resetSearchResults(): void {
      this.userCollection = undefined;
    }
  }
});
</script>