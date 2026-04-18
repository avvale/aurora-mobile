import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createCounterSlice } from './slices/counter.slice';
import { createRootSlice } from './slices/root.slice';
import { persistStorage } from './storage';
import type { RootState } from './types';

// Store global combinando todos los slices.
//
// `create<RootState>()(...)` con doble `()` es obligatorio en Zustand v5 + TS:
// sin eso, los tipos de los middlewares se pierden.
//
// Middlewares (se leen de fuera hacia dentro):
//   devtools → persist → creador de slices
//   · persist: guarda parte del estado en AsyncStorage entre sesiones.
//   · devtools: conecta con la extensión Redux DevTools (sólo en dev).
//
// `(...a)` son `(set, get, api)`; cada slice los recibe y se fusionan con spread.
export const useStore = create<RootState>()(
  devtools(
    persist(
      (...a) => ({
        ...createCounterSlice(...a),
        ...createRootSlice(...a),
      }),
      {
        name: 'aurora-store',
        storage: persistStorage,
        version: 1,
        // Qué persistir. NUNCA incluir acciones (funciones no serializables).
        partialize: (state) => ({ counter: state.counter }),
        // Se ejecuta cuando la `version` guardada es menor que la actual.
        // Aquí conviertes el estado viejo al nuevo formato.
        migrate: (persistedState) => persistedState as RootState,
      },
    ),
    { name: 'AuroraStore', enabled: __DEV__ },
  ),
);
