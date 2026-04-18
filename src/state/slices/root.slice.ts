import type { StateCreator } from 'zustand';

import type { RootState } from '../types';
import { counterInitialState } from './counter.slice';

// Slice raíz para acciones que tocan varios slices a la vez.
// Útil para logout, init de app, limpieza de tests, etc.
export interface RootSlice {
  rootActions: {
    resetAll: () => void;
  };
}

type SliceCreator = StateCreator<
  RootState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  RootSlice
>;

export const createRootSlice: SliceCreator = (set) => ({
  rootActions: {
    // Devuelve TODOS los slices a su initialState.
    // Al añadir un slice nuevo, spreadéa aquí su `xxxInitialState`.
    // Nota: no limpia AsyncStorage; si hace falta, llamar además a
    // `useStore.persist.clearStorage()`.
    resetAll: () =>
      set(
        {
          ...counterInitialState,
        },
        false,
        'root/resetAll',
      ),
  },
});
