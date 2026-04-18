import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

// Adaptador de almacenamiento para el middleware `persist`.
// `createJSONStorage` se encarga de serializar/deserializar JSON por nosotros.
// Abstraerlo aquí permite cambiar el motor sin tocar el store.
//
// Para escrituras muy frecuentes, swap a `react-native-mmkv` (~30x más rápido):
//   import { MMKV } from 'react-native-mmkv';
//   const mmkv = new MMKV();
//   export const persistStorage = createJSONStorage(() => ({
//     getItem: (k) => mmkv.getString(k) ?? null,
//     setItem: (k, v) => mmkv.set(k, v),
//     removeItem: (k) => mmkv.delete(k),
//   }));
export const persistStorage = createJSONStorage(() => AsyncStorage);
