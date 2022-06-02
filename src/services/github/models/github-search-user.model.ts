import { GithubSearchUserDto } from "@/data-contract/github";

export class GithubSearchUserModel {
  constructor(
    public id: number,
    public login: string
  ) { }

  static from(dto: GithubSearchUserDto): GithubSearchUserModel {
    return new GithubSearchUserModel(
      dto.id,
      dto.login
    );
  }
}
