import { useStore } from '../store';

// Acciones globales del store. Devolver el objeto entero es seguro porque
// las acciones son estables (su referencia no cambia entre renders).
export const useRootActions = () => useStore((s) => s.rootActions);
