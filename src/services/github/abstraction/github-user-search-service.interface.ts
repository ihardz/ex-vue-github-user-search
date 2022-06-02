import { GithubSearchUserCollectionModel } from "..";

export interface GithubUserSearchServiceInterface {
  searchUsers: (term: string, pageSize: number) => Promise<GithubSearchUserCollectionModel>
}