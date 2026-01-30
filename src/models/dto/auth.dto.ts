/**
 * OAuth Data Transfer Objects
 */

export interface OAuthCredentials {
  accessToken: string;
  refreshToken: string;
}

export interface OAuthLoginInput {
  grantType: 'PASSWORD' | 'REFRESH_TOKEN';
  username?: string;
  password?: string;
  refreshToken?: string;
}
