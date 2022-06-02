

<template>
  <div class="github-user-search-view">
    <GithubUserList />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { GithubUserList } from '@/components/github';
import { SYMBOL_GITHUB_USER_SEARCH_SERVICE } from '@/dependency-injection';
import { GithubSearchUserCollectionModel } from '@/services/github';

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
    userCollection?: GithubSearchUserCollectionModel
  } {
    return {
      userCollection: undefined
    };
  },
  async mounted(): Promise<void> {
    this.userCollection = await this.githubSearchUserService.searchUsers('ihard', 100);
    console.debug('[GithubUserSearchView.vue] userCollection', this.userCollection); 
  }
});
</script>