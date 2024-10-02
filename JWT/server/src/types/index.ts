export interface User {
  _id: string;
  username: string;
  email: string;
  roles?: number[];
}

export interface JWTData {
  iss: string;
  sub: string;
  aud: string;
  nbf: number;
  data?: {
    username?: string;
    email?: string;
  };
}
