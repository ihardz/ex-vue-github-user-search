import { GithubSearchUserDto } from "@/data-contract/github";

export class GithubSearchUserModel {
  constructor(
    public id: string,
    public login: string,
    public name: string,
    public avatarUrl: string,
    public email: string,
    public bio: string,
    public location: string,
    public url: string
  ) { }

  static from(dto: GithubSearchUserDto): GithubSearchUserModel {
    return new GithubSearchUserModel(
      dto.id,
      dto.login,
      dto.name,
      dto.avatarUrl,
      dto.email,
      dto.bio,
      dto.location,
      dto.url
    );
  }
}
