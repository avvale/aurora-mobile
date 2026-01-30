/**
 * Contacts Service
 */

import type { ContactsPagination } from '@/models/dto/contacts.dto';
import { gql } from '@apollo/client';
import { apolloClient } from '../client';

const SCOUTS_PAGINATE_CONTACTS = gql`
  query ScoutsPaginateContacts($query: QueryStatement, $constraint: QueryStatement) {
    pagination: scoutsPaginateContacts(query: $query, constraint: $constraint) {
      total
      rows
      count
    }
  }
`;

interface ContactsResponse {
  pagination: ContactsPagination;
}

/**
 * Get paginated contacts
 */
export async function getContacts(): Promise<ContactsPagination> {
  try {
    console.log('[Contacts Service] 🔍 Fetching paginated contacts...');

    const { data } = await apolloClient.query<ContactsResponse>({
      query: SCOUTS_PAGINATE_CONTACTS,
      variables: {
        query: {
          limit: 50,
          offset: 0,
          order: [['createdAt', 'desc']],
        },
      },
      fetchPolicy: 'network-only',
    });

    if (!data) {
      console.error('[Contacts Service] ❌ No data returned from query');
      throw new Error('No data returned from contacts query');
    }

    console.log(`[Contacts Service] ✅ Retrieved ${data.pagination.count} contacts`);
    return data.pagination;
  } catch (error) {
    console.error('[Contacts Service] ❌ Error fetching contacts:', error);
    throw error;
  }
}
