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
import { GithubUserListSearchEvent, GithubUserListSearchPageEvent } from './events';

const EVENT_SEARCH = 'search';
const EVENT_PAGE = 'page';
const DEFAULTS_PAGE_SIZE = 10;

declare type InternalPaginatorState = {
  first: number,
  totalRecords: number
}

export default defineComponent({
  emits: [EVENT_SEARCH, EVENT_PAGE],
  props: {
    users: Array as PropType<GithubSearchUserModel[]>,
    totalCount: Number,
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [DEFAULTS_PAGE_SIZE]
    },
    hasNextPage: Boolean,
    hasPreviousPage: Boolean
  },
  data(): {
    searchTerm?: string,
    internalPaginatorState: InternalPaginatorState,
    pageSize: number
  } {
    return {
      searchTerm: undefined,
      internalPaginatorState: {
        first: 0,
        totalRecords: 0
      },
      pageSize: this.pageSizes[0] || DEFAULTS_PAGE_SIZE
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
      return this.internalPaginatorState.first;
    },
    paginatorTotalRecords(): number {
      return this.internalPaginatorState.totalRecords;
    }
  },
  watch: {
    searchTerm(newVal?: string, oldVal?: string): void {
      (newVal !== oldVal) && this._initSearch(newVal);
    },
    users(): void {
      this._syncInternalPaginatorState();
    }
  },
  methods: {    
    handlePage({ first }: { first: number }): void {
      const isNext = this.internalPaginatorState.first < first;
      const event: GithubUserListSearchPageEvent = {
        term: this.searchTerm,        
        pageSize: this.pageSize,
        isNext
      }
      console.log('handlePage > event', event);
      this.$emit(EVENT_PAGE, event);
    },
    _initSearch(term?: string): void {
      const event: GithubUserListSearchEvent = {
        term,
        pageSize: this.pageSize
      };
      this.$emit(EVENT_SEARCH, event);
    },
    _syncInternalPaginatorState(): void {
      const first = this.hasPreviousPage ? this.pageSize : 0;
      const countBeforeNextPageFirst = first + this.pageSize;
      const totalRecords = this.hasNextPage ? (countBeforeNextPageFirst + 1) : (countBeforeNextPageFirst);
      console.log('_syncInternalPaginatorState',  { first, totalRecords });
      this.internalPaginatorState = { first, totalRecords };
    }
  }
});
</script>
