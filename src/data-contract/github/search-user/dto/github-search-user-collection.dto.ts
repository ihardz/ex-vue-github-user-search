import { GithubSearchUserDto } from ".";

export interface GithubSearchUserCollectionDto {
  data: {
    search: {
      pageInfo: {
        startCursor: string,
        endCursor: string,
        hasPreviousPage: boolean,
        hasNextPage: boolean
      },
      userCount: number,
      nodes: GithubSearchUserDto[]
    }
  }
}
