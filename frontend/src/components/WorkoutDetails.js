// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import RemoveCircleOutlineOutlinedIcon
  from '@mui/icons-material/RemoveCircleOutlineOutlined';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4 className="contra-font-subtitle">{workout.title}</h4>

        <p>
          <small>weight (lb): </small>
          {workout.weight}
        </p>
        <p>
          <small>sets: </small>
          {workout.sets}
        </p>
        <p>
          <small>reps: </small>
          {workout.reps}
        </p>

        <br />

        <small className="date-font">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </small>

        <span onClick={handleClick}>
          {/* delete */}
          <RemoveCircleOutlineOutlinedIcon />
        </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
