import type { CounterSlice } from './slices/counter.slice';
import type { RootSlice } from './slices/root.slice';

// Estado global = intersección (`&`) de todos los slices.
// Al añadir un slice nuevo, impórtalo y añádelo aquí con `&`.
export type RootState = CounterSlice & RootSlice;
