/**
 * OAuth Authentication Service
 */

import type { OAuthCredentials, OAuthLoginInput } from '@/models/dto/auth.dto';
import { gql } from '@apollo/client';
import { apolloClient } from '../client';

const OAUTH_CREATE_CREDENTIALS = gql`
  mutation oAuthCreateCredentials($payload: OAuthCreateCredentialsInput!) {
    oAuthCreateCredentials(payload: $payload) {
      accessToken
      refreshToken
    }
  }
`;

interface OAuthResponse {
  oAuthCreateCredentials: OAuthCredentials;
}

/**
 * Authenticate user and get OAuth tokens
 */
export async function login(payload: OAuthLoginInput): Promise<OAuthCredentials> {
  try {
    console.log('[Auth Service] 🔐 Attempting login...');

    const { data } = await apolloClient.mutate<OAuthResponse>({
      mutation: OAUTH_CREATE_CREDENTIALS,
      variables: { payload },
    });

    if (!data) {
      console.error('[Auth Service] ❌ No credentials returned');
      throw new Error('No data returned from login');
    }

    console.log('[Auth Service] ✅ Login successful');
    return data.oAuthCreateCredentials;
  } catch (error) {
    console.error('[Auth Service] ❌ Login failed:', error);
    throw error;
  }
}
