export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface RefreshingAccessToken {
  refreshToken: string;
}
