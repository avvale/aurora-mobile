import type { OAuthCredentials } from '@/models/dto/auth.dto';
import type { Contact } from '@/models/dto/contacts.dto';
import { clearAuthToken, setAuthToken } from '@/services/graphql/client';
import { login } from '@/services/graphql/test-scouts/auth.service';
import { getContacts } from '@/services/graphql/test-scouts/contacts.service';
import { useState } from 'react';

interface ProfileState {
  isLoading: boolean;
  isLoadingContacts: boolean;
  authData: OAuthCredentials | null;
  contacts: Contact[];
  error: string | null;
}

export function useProfileViewModel() {
  const [state, setState] = useState<ProfileState>({
    isLoading: false,
    isLoadingContacts: false,
    authData: null,
    contacts: [],
    error: null,
  });

  const performLogin = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const credentials = await login({
        grantType: 'PASSWORD',
        username: 'miguel.rosso+familiardes@avvale.com',
        password: '123456',
      });

      // Guardar el token para futuras peticiones
      setAuthToken(credentials.accessToken);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        authData: credentials,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        authData: null,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  const loadContacts = async () => {
    setState((prev) => ({ ...prev, isLoadingContacts: true, error: null }));

    try {
      const pagination = await getContacts();

      setState((prev) => ({
        ...prev,
        isLoadingContacts: false,
        contacts: pagination.rows,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoadingContacts: false,
        contacts: [],
        error: error instanceof Error ? error.message : 'Error cargando contactos',
      }));
    }
  };

  const logout = () => {
    clearAuthToken();
    setState({
      isLoading: false,
      isLoadingContacts: false,
      authData: null,
      contacts: [],
      error: null,
    });
  };

  return {
    // State
    isLoading: state.isLoading,
    isLoadingContacts: state.isLoadingContacts,
    isAuthenticated: state.authData !== null,
    authData: state.authData,
    contacts: state.contacts,
    error: state.error,

    // Actions
    performLogin,
    loadContacts,
    logout,
  };
}
