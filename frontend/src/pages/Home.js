import { useEffect } from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
  // invoke the hook and grab the workouts and dispatch functions
  const { workouts, dispatch } = useWorkoutsContext();

  // once we fetch the data, we dispatch the action, and update the workouts state
  // the value of the workouts from that hook update too, and then cycle through those workouts in the template render
  useEffect(() => {
    // fetch `workouts` data from backend api, which runs just once when the component renders
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      // once data comes back, we use dispatch function to update the global workout context state
      // workout context is created in `WorkoutContext.js` in context folder
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <>
      <div className="home">
        <WorkoutForm />

        <div className="workouts">
          <h2 className="contra-font-subtitle">completed workout</h2>
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>

        {/* <WorkoutForm /> */}
      </div>
    </>
  );
};

export default Home;
