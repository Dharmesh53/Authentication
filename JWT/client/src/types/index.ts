export enum Roles {
  User = 0,
  Editor = 1,
  Admin = 2
}

export interface AuthType {
  _id: string,
  username: string,
  email: string,
  roles: number[],
  accessToken: string
}
