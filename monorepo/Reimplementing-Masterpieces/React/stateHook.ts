import { useState } from 'react'
export default function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(v => !v);

  return { value, setTrue, setFalse, toggle };
}



//import { useState } from 'react';

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset, setCount };
}