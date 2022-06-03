import { GithubSearchUserCollectionModel, GithubUserSearchPaginationOptionsAbstract } from "..";

export interface GithubUserSearchServiceInterface {
  searchUsers: (term: string, pageOptions: GithubUserSearchPaginationOptionsAbstract) => Promise<GithubSearchUserCollectionModel>
}