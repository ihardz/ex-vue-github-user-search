import { GithubSearchUserCollectionModel } from "..";

export interface GithubUserSearchServiceInterface {
  searchUsers: (term: string) => Promise<GithubSearchUserCollectionModel>
}