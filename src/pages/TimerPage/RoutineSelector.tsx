import { Setter } from "solid-js";
import { Routine } from "../../helpers/types";

type RoutineSelectorProps = {
  setRoutine: Setter<Routine>;
};

const RoutineSelector = (props: RoutineSelectorProps) => {
  // Make use of props.setRoutine to change routines
  return (
    <div class="w-fit m-2 p-1 rounded border border-sky-500 text-sky-500 text-sm">
      Routine: Default
    </div>
  );
};

export default RoutineSelector;
