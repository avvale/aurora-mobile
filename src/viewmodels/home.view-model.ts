import { useState } from 'react';

interface HomeState {
  greeting: string;
  counter: number;
  selectedDate: Date | null;
}

export function useHomeViewModel() {
  const [state, setState] = useState<HomeState>({
    greeting: '¡Bienvenido a Aurora Mobile!',
    counter: 0,
    selectedDate: null,
  });

  const incrementCounter = () => {
    setState((prev) => ({ ...prev, counter: prev.counter + 1 }));
  };

  const decrementCounter = () => {
    setState((prev) => ({ ...prev, counter: prev.counter - 1 }));
  };

  const resetCounter = () => {
    setState((prev) => ({ ...prev, counter: 0 }));
  };

  const setSelectedDate = (date: Date) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  };

  return {
    // State
    greeting: state.greeting,
    counter: state.counter,
    selectedDate: state.selectedDate,

    // Actions
    incrementCounter,
    decrementCounter,
    resetCounter,
    setSelectedDate,
  };
}
