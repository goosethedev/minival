import { Component, createSignal } from "solid-js";
import { TESTING_ROUTINE } from "./helpers/routine-builder";
import { TimerContextProvider, useTimerContext } from "./contexts/TimerContext";
import ConfirmModal from "./components/ConfirmModal";
import RoutineSelector from "./components/RoutineSelector";
import Clock from "./components/Clock";
import PomoCount from "./components/PomoCount";

const TimerPage: Component = () => {
  // Routine to run timers. Load default at start.
  const [routine, setRoutine] = createSignal(TESTING_ROUTINE);

  return (
    <TimerContextProvider routine={routine}>
      <div class="h-full flex flex-col justify-between">
        {/* Modal to show when timer finishes */}
        <ConfirmModal />

        {/* Header */}
        <div class="">
          <RoutineSelector setRoutine={setRoutine} />
        </div>

        {/* Center */}
        <Clock />

        {/* Footer */}
        <div class="grid grid-cols-3 justify-center p-2">
          <div class="mr-auto">
            <ConfigButton />
          </div>
          <div class="">
            <TimerControllers />
          </div>
          <div class="ml-auto">
            <PomoCount />
          </div>
        </div>
      </div>
    </TimerContextProvider>
  );
};

const ConfigButton = () => {
  return <div>Config TODO</div>;
};

const TimerControllers = () => {
  const { dropCycle, finishCycle } = useTimerContext();

  return (
    <div class="flex flex-row justify-center gap-4">
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
