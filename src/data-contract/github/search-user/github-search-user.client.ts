import axios from "axios";
import { GithubSearchUserCollectionDto } from ".";
import { SearchUserRequestPayloadBuilder } from "./search-user-request-payload-builder";

const PATH_SEARCH_USERS = '/graphql';

export class GithubSearchUserClient {
  static async searchUsers(term: string, pageSize: number): Promise<GithubSearchUserCollectionDto> {
    const params = SearchUserRequestPayloadBuilder.buildGraphQLQuery({ term, pageSize });
    const response = await axios.post<GithubSearchUserCollectionDto>(PATH_SEARCH_USERS, params);
    console.debug('[GithubSearchUserClient] GithubSearchUserClient', response.data);
    return response.data;
  }
}
