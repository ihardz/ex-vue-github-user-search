import axios from "axios";
import { GithubSearchUserCollectionDto } from ".";
import { SearchUserRequestParamsBuilder } from "./search-user-request-params-builder";

const PATH_SEARCH_USERS = '/search/users';

export class GithubSearchUserClient {
  static async searchUsers(term: string): Promise<GithubSearchUserCollectionDto> {
    const params = SearchUserRequestParamsBuilder.build({ term });
    const response = await axios.get<GithubSearchUserCollectionDto>(PATH_SEARCH_USERS, { params } );
    return response.data;
  }
}
