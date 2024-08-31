import { useState, useCallback } from 'react';


// Define a type for the state
type State = {
    count: number;
  };
  
  // Define a type for the action
  type Action =
    | { type: 'increment' }
    | { type: 'decrement' };
  
  // Define a type for the reducer function
  type Reducer<S, A> = (state: S, action: A) => S;
  

  function useReducer<S, A>(reducer: Reducer<S, A>, initialState: S): [S, (action: A) => void] {
    // Initialize state and setter function
    const [state, setState] = useState<S>(initialState);
  
    // The dispatch function
    const dispatch = useCallback((action: A) => {
      setState((prevState) => reducer(prevState, action));
    }, [reducer]);
  
    // Return the current state and the dispatch function
    return [state, dispatch];
  }

// Example Usage

// Define the reducer function
const counterReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error(`Unhandled action type: ${(action as unknown)?.type}`);
    }
  };

// Component using the custom useReducer
const Counter: React.FC = () => {
    const [state, dispatch] = useReducer<State, Action>(counterReducer, { count: 0 });
  
    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      </div>
    );
  }
  
  export default Counter;
