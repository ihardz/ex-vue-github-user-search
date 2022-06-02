import { GithubSearchUserClient } from "@/data-contract/github";
import { GithubUserSearchServiceInterface } from "../abstraction";
import { GithubSearchUserCollectionModel } from "../models";

export class GithubUserSearchService implements GithubUserSearchServiceInterface {
  async searchUsers(term: string): Promise<GithubSearchUserCollectionModel> {
    const dto = await GithubSearchUserClient.searchUsers(term);
    return GithubSearchUserCollectionModel.from(dto);
  }
}
