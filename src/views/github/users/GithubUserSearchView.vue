

<template>
  <div class="github-user-search-view">
    <GithubUserList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GithubUserList } from '@/components';

export default defineComponent({
  components: {
    GithubUserList
  }
});
</script>