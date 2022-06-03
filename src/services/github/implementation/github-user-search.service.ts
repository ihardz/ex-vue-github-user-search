import { GithubSearchUserClient } from "@/data-contract/github";
import { GithubUserSearchServiceInterface } from "../abstraction";
import { GithubSearchUserCollectionModel, GithubUserSearchPaginationOptionsAbstract } from "../models";

export class GithubUserSearchService implements GithubUserSearchServiceInterface {
  async searchUsers(term: string, pageOptions: GithubUserSearchPaginationOptionsAbstract): Promise<GithubSearchUserCollectionModel> {
    const graphQlSearchExpression = pageOptions.toGraphQlSearchExpression();
    const dto = await GithubSearchUserClient.searchUsers(term, graphQlSearchExpression);
    return GithubSearchUserCollectionModel.from(dto);
  }
}
