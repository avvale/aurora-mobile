import { useStore } from '../store';

// Hooks atómicos del slice `counter`. Los componentes/ViewModels consumen
// desde aquí, nunca `useStore` directo: así cada uno se suscribe sólo al
// trozo que necesita y evitamos re-renders innecesarios.
//
// Dos hooks separados (no un objeto) porque Zustand compara con `===`:
// devolver `{ value, increment }` crearía un objeto nuevo cada render y
// provocaría re-render siempre. El primitivo y el objeto de acciones
// (estable) sí son seguros.
export const useCounterValue = () => useStore((s) => s.counter.value);
export const useCounterActions = () => useStore((s) => s.counterActions);
