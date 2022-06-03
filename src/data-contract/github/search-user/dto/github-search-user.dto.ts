export interface GithubSearchUserDto {
  id: string,
  login: string,
  name: string,
  avatarUrl: string,
  email: string,
  bio: string,
  location: string,
  url: string,
  followers: {
    totalCount: number
  }
}