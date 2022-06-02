import { StringHelper } from "@/helpers";

export declare type SearchUserOptions = {
  term: string,
  pageSize: number
};

export class SearchUserRequestPayloadBuilder  {

  public static buildGraphQLQuery(options: SearchUserOptions) {
    const usersQuery = this.buildUsersQuery(options);
    const variables = {
      usersQuery,
      pageSize: options.pageSize
    };
    const query = `
    query SearchUsers($usersQuery: String!, $pageSize: Int!){
      search(first: $pageSize, type:USER query: $usersQuery) {
        pageInfo {
          startCursor      
          endCursor
          hasPreviousPage
          hasNextPage
        },
        userCount,
        nodes {
            ... on User {
            id,
            name,
            login,
            avatarUrl,
            email,
            bio,
            location,                
            url,
            followers { 
              totalCount
            }
          }
        }
      }
    }`;
    return {
      query,
      variables
    };
  }

  private static buildUsersQuery(options: SearchUserOptions): string {
    const term = options?.term;
    const termNormalized = StringHelper.trimTrailingSpaces(term);
    if(!termNormalized) {
      throw new Error(`[SearchUserRequestParamsBuilder.build] Invalid parameter: term="${term}"`)
    }
    return `${termNormalized} in:name in:login in:bio type:user`;
  }
}
