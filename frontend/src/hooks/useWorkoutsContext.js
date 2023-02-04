import { useContext } from 'react';

import { WorkoutsContext } from '../context/WorkoutContext';

// to use the context in any component, we invoke this hook (useWorkoutsContext)
// returns the context value, which contains the workouts and the dispatcher functions
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};

// this is currently invoked in Home component
