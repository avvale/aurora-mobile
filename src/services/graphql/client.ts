/**
 * ============================================
 * Apollo Client Configuration
 * ============================================
 */

import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';

const GRAPHQL_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_URL;

// OAuth Application Credentials (Basic Auth)
const OAUTH_CLIENT_ID = ''; // rellenar
const OAUTH_CLIENT_SECRET = ''; // rellenar
const basicAuthToken = btoa(`${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`);

// Token storage
let authToken: string | null = null;

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Auth link - adds authorization header
const authLink = new SetContextLink(() => {
  return {
    headers: {
      // Basic Auth for OAuth application
      Authorization: authToken ? `Bearer ${authToken}` : `Basic ${basicAuthToken}`,
    },
  };
});

// Apollo Client instance
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Merge paginated results
          iamPaginatePermissions: {
            keyArgs: ['query'],
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

/**
 * Set the authorization token for all GraphQL requests
 */
export function setAuthToken(token: string): void {
  authToken = token;
}

/**
 * Clear the authorization token
 */
export function clearAuthToken(): void {
  authToken = null;
}

/**
 * Get the current auth token
 */
export function getAuthToken(): string | null {
  return authToken;
}

/**
 * Clear Apollo cache and reset store
 */
export async function resetApolloStore(): Promise<void> {
  await apolloClient.resetStore();
}

/**
 * Clear Apollo cache without refetching
 */
export function clearApolloCache(): void {
  apolloClient.cache.reset();
}
