<template>
  <div class="github-user-list-component">
    <DataView :value="users"
      :lazy="true" :paginator="true" paginatorTemplate="PrevPageLink NextPageLink"
      :first="paginatorFirst" :totalRecords="paginatorTotalRecords"
      :rows="pageSize"  @page="handlePage($event)">
			<template #header>
        <div class="flex">
          <div>
            <DelayedInputText v-model="searchTerm" placeholder="Search GitHub" />
          </div>
          <div>
            <span>{{totalUsersFoundDisplay}}</span>
          </div>          
        </div>        
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

declare type InternalPaginatorState = {
  first: number,
  totalRecords: number
}

export default defineComponent({
  emits: [EVENT_SEARCH],
  props: {
    users: Array as PropType<GithubSearchUserModel[]>,
    totalCount: Number,
    pageSize: {
      type: Number,
      default: 10
    },
    hasNextPage: Boolean,
    hasPreviousPage: Boolean
  },
  data(): {
    searchTerm?: string,
    internalPaginatorState: InternalPaginatorState
  } {
    return {
      searchTerm: undefined,
      internalPaginatorState: {
        first: 0,
        totalRecords: 0
      }
    }
  },
  computed: {
    totalUsersFoundDisplay(): string {
      if(isNaN(this.totalCount as number)) {
        return String();
      } else if(!this.totalCount){
        return 'No users found';
      } else if(this.totalCount == 1) {
        return `Single user found ;)`;
      } else {
        return `${this.totalCount} users found`
      }
    },
    paginatorFirst(): number {
      console.log('paginatorFirst()',  this.internalPaginatorState);
      return this.internalPaginatorState.first;
      
    },
    paginatorTotalRecords(): number {
      return this.internalPaginatorState.totalRecords;
    }
  },
  watch: {
    searchTerm(newVal?: string, oldVal?: string): void {
      (newVal !== oldVal) && this.initSearch(newVal);
    },
    users(): void {
      console.log('here');
      this._syncInternalPaginatorState();
    }
  },
  methods: {
    initSearch(term?: string): void {
      this.$emit(EVENT_SEARCH, term);
    },
    handlePage({page}: {page: number}): void {
      console.log(arguments);
    },
    _syncInternalPaginatorState(canNavigatePrevious = true, canNavigateNext = true): void {
      const first = (canNavigatePrevious && this.hasPreviousPage) ? this.pageSize + 1 : 0;
      const countBeforeNextPageFirst = first + this.pageSize;
      const totalRecords = (canNavigateNext && this.hasNextPage) ? (countBeforeNextPageFirst) : (countBeforeNextPageFirst - 1);
      console.log('_syncInternalPaginatorState',  { first, totalRecords });
      this.internalPaginatorState = { first, totalRecords };
    }
  }
});
</script>
