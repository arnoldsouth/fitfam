import {
  createContext,
  useReducer,
} from 'react';

export const WorkoutsContext = createContext();

// reducer function updates our state whenever we dispatch an action (like we did in the Home.js component)
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    // fetch all of the workouts to begin with (like we did in the Home.js component)
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    // creating new workouts when we submit the form and add a new workout to the database
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    // deleting workouts when after we hit the `delete` button and delete a workout from the database
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// this global context wraps our entire application (root component) and can be accessed in any other component (in index.js)
export const WorkoutsContextProvider = ({ children }) => {
  // state value for `workouts` starts out as `null`
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

// to consume this context, we need to create a hook (in hooks folder)
