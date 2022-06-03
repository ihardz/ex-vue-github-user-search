import { GithubSearchUserCollectionDto } from '@/data-contract/github';
import { GithubSearchUserModel } from '.';

export class GithubSearchUserCollectionModel {
  constructor(
    public items: GithubSearchUserModel[],
    public totalCount: number,
    public startCursor: string,
    public endCursor: string,
    public hasPreviousPage: boolean,
    public hasNextPage: boolean
  ) { }

  static from(dto: GithubSearchUserCollectionDto): GithubSearchUserCollectionModel {
    const { userCount, nodes , pageInfo } = dto.data.search;
    const items = nodes.map(GithubSearchUserModel.from);
    return new GithubSearchUserCollectionModel(
      items,
      userCount,
      pageInfo.startCursor,
      pageInfo.endCursor,
      pageInfo.hasPreviousPage,
      pageInfo.hasNextPage
    );
  }
}
