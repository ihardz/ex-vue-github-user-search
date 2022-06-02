import { GithubSearchUserDto } from ".";

export interface GithubSearchUserCollectionDto {
  items: GithubSearchUserDto[],
  total_count: number,
}
