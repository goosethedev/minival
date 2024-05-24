import { Component, createSignal } from "solid-js";
import { TESTING_ROUTINE } from "./helpers/routine-builder";
import { TimerContextProvider, useTimerContext } from "./contexts/TimerContext";
import ConfirmModal from "./components/ConfirmModal";
import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";

const TimerPage: Component = () => {
  // Routine to run timers. Load default at start.
  const [routine, setRoutine] = createSignal(TESTING_ROUTINE);

  return (
    <TimerContextProvider routine={routine}>
      {/* Modal to show when timer finishes */}
      <ConfirmModal />

      <div class="bg-black text-sky-500 w-full h-screen flex flex-col justify-between">
        {/* header working */}
        <div class="">
          <RoutineSelector setRoutine={setRoutine} />
        </div>
        <Clock />
        {/* footer working */}
        <div class="">
          <TimerControllers />
        </div>
      </div>
    </TimerContextProvider>
  );
};

const TimerControllers = () => {
  const { dropCycle, finishCycle } = useTimerContext();

  return (
    <div class="flex flex-row justify-center gap-4 mb-2">
      {/* <Button label="+1 min" action={addOneMinute} /> */}
      <Button label="Drop" action={dropCycle} />
      <Button label="Finish" action={finishCycle} />
    </div>
  );
};

const Button = (props: { label: string; action: () => void }) => (
  <button
    class="text-sky-500 p-2 border border-sky-500 rounded"
    onClick={props.action}
  >
    {props.label}
  </button>
);

export default TimerPage;
