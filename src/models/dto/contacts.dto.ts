/**
 * Contact Data Transfer Objects
 */

export interface Contact {
  id: string;
  name: string;
  surname1?: string;
  surname2?: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

export interface ContactsPagination {
  total: number;
  rows: Contact[];
  count: number;
}
