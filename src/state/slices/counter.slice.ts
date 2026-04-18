import type { StateCreator } from 'zustand';

import type { RootState } from '../types';

// Convención: separamos ESTADO (`counter`) de ACCIONES (`counterActions`).
// Permite que los componentes se suscriban sólo al valor que consumen y
// agrupa las funciones (que son estables) en un objeto único.
export interface CounterSlice {
  counter: {
    value: number;
  };
  counterActions: {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  };
}

// Tipo del creador: conoce el `RootState` entero y los middlewares aplicados
// en `store.ts` (mismo orden). Necesario para que `set` tenga la firma extendida.
type SliceCreator = StateCreator<
  RootState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  CounterSlice
>;

// Initial state exportado para compartir fuente de verdad entre `reset`
// (aquí) y `rootActions.resetAll` (en root.slice.ts).
export const counterInitialState: Pick<CounterSlice, 'counter'> = {
  counter: { value: 0 },
};

export const createCounterSlice: SliceCreator = (set) => ({
  ...counterInitialState,
  counterActions: {
    // Firma con devtools: set(partial, replace, actionName).
    //   · replace=false → mergea el estado (default).
    //   · actionName    → etiqueta que aparece en Redux DevTools.
    increment: () =>
      set(
        (state) => ({ counter: { value: state.counter.value + 1 } }),
        false,
        'counter/increment',
      ),
    decrement: () =>
      set(
        (state) => ({ counter: { value: state.counter.value - 1 } }),
        false,
        'counter/decrement',
      ),
    reset: () => set(counterInitialState, false, 'counter/reset'),
  },
});
