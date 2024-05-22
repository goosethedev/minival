import { Component, createSignal } from "solid-js";
import {
  TimerContextProvider,
  useTimerContext,
} from "../../contexts/TimerContext";
import TimerAdapter from "./TimerAdapter";
import RoutineSelector from "./RoutineSelector";
import { DEFAULT_ROUTINE } from "./routine-builder";

const TimerPage: Component = () => {
  // Routine to run timers. Load default at start.
  const [routine, setRoutine] = createSignal(DEFAULT_ROUTINE);

  return (
    <TimerContextProvider routine={routine}>
      <div class="bg-black text-sky-500 w-full h-screen flex flex-col justify-between">
        {/* header working */}
        <div class="">
          <RoutineSelector setRoutine={setRoutine} />
        </div>
        <TimerAdapter />
        {/* footer working */}
        <div class="">
          <TimerControllers />
        </div>
      </div>
    </TimerContextProvider>
  );
};

const TimerControllers = () => {
  const { addOneMinute, dropped, finished } = useTimerContext();

  return (
    <div class="flex flex-row justify-center gap-4 mb-2">
      <Button label="+1 min" action={addOneMinute} />
      <Button label="Drop" action={dropped} />
      <Button label="Finish" action={finished} />
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
