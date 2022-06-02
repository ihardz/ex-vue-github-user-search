import { GithubSearchUserCollectionDto } from '@/data-contract/github';
import { GithubSearchUserModel } from '.';

export class GithubSearchUserCollectionModel {
  constructor(
    public items: GithubSearchUserModel[],
    public totalCount: number,
  ) { }

  static from(dto: GithubSearchUserCollectionDto): GithubSearchUserCollectionModel {
    const { userCount, nodes } = dto.data.search;
    const items = nodes.map(GithubSearchUserModel.from);
    return new GithubSearchUserCollectionModel(items, userCount);
  }
}
