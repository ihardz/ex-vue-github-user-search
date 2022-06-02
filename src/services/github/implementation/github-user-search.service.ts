import { GithubSearchUserClient } from "@/data-contract/github";
import { GithubUserSearchServiceInterface } from "../abstraction";
import { GithubSearchUserCollectionModel } from "../models";

export class GithubUserSearchService implements GithubUserSearchServiceInterface {
  async searchUsers(term: string, pageSize: number): Promise<GithubSearchUserCollectionModel> {
    const dto = await GithubSearchUserClient.searchUsers(term, pageSize);
    return GithubSearchUserCollectionModel.from(dto);
  }
}
