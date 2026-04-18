import { useState } from 'react';

import { useCounterActions, useCounterValue } from '@/state/hooks/use-counter';

interface HomeState {
  greeting: string;
  selectedDate: Date | null;
}

export function useHomeViewModel() {
  const [state, setState] = useState<HomeState>({
    greeting: '¡Bienvenido a Aurora Mobile!',
    selectedDate: null,
  });

  const counter = useCounterValue();
  const { increment, decrement, reset } = useCounterActions();

  const setSelectedDate = (date: Date) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  };

  return {
    greeting: state.greeting,
    counter,
    selectedDate: state.selectedDate,

    incrementCounter: increment,
    decrementCounter: decrement,
    resetCounter: reset,
    setSelectedDate,
  };
}
