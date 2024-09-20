export interface User {
  _id: string;
  username: string;
  email: string;
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
