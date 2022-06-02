import { GithubSearchUserCollectionDto } from '@/data-contract/github';
import { GithubSearchUserModel } from '.';

export class GithubSearchUserCollectionModel {
  constructor(
    public items: GithubSearchUserModel[],
    public totalCount: number,
  ) { }

  static from(dto: GithubSearchUserCollectionDto): GithubSearchUserCollectionModel {
    const items = dto.items.map(GithubSearchUserModel.from);
    return new GithubSearchUserCollectionModel(items, dto.total_count);
  }
}
