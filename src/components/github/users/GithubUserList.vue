<template>
  <div class="github-user-list-component">
    <DataView :value="users">
			<template #header>
        <DelayedInputText v-model="searchTerm" placeholder="Search GitHub" />
			</template>

			<template #list="{ data }">
        <div class="w-full flex">
          <div>
            <Avatar :image="data.avatarUrl"  class="mr-2" shape="circle" />
          </div>
          <div>
            <div>{{data.name}}</div>
            <div>{{data.login}}</div>
            <div>{{data.bio}}</div>
            <div>{{data.location}}</div>
          </div>
				</div>    
			</template>

      <template #empty>
        <div>
          Empty
        </div>        
      </template>
		</DataView>
  </div>
</template>

<script lang="ts">
import { GithubSearchUserModel } from '@/services/github';
import { defineComponent, PropType } from 'vue';

const EVENT_SEARCH = 'search';

export default defineComponent({
  emits: [EVENT_SEARCH],
  props: {
    users: Array as PropType<GithubSearchUserModel[]>
  },
  data(): {
    searchTerm?: string
  } {
    return {
      searchTerm: undefined,
    }
  },
  watch: {
    searchTerm(newVal?: string, oldVal?: string): void {
      (newVal !== oldVal) && this.initSearch(newVal);
    },
  },
  methods: {
    initSearch(term?: string): void {
      this.$emit(EVENT_SEARCH, term);
    }
  }
});
</script>
