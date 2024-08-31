// It is not useful for simple state like this but is very useful for complex apps

import { useReducer } from 'react';
import './App.css';

// Define types for TypeScript
type State = {
  count: number;
};

type Action = {
  type: 'increment' | 'decrement';
};

// Reducer function to handle state updates based on actions
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  // Initialize the reducer with initial state
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // Function to increment count
  function increment() {
    dispatch({ type: 'increment' });
  }

  // Function to decrement count
  function decrement() {
    dispatch({ type: 'decrement' });
  }

  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </>
  );
}

export default App;
