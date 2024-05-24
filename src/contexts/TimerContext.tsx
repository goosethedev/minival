import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { Routine } from "../helpers/types";
import { createAudio } from "@solid-primitives/audio";

// List of pomos to run sequencially
interface TimerContextProps extends ParentProps {
  routine: Accessor<Routine>;
}

const TimerContextValue = (props: TimerContextProps) => {
  // Track current cycle with its index
  const [cycleIdx, setCycleIdx] = createSignal(0);
  const currCycle = () => props.routine()[cycleIdx()];

  // Actual time to display
  const timeSignal = createSignal(currCycle().duration);
  // Total runtime (used when minutes added or skipped/finished early)
  const [runtime, setRuntime] = createSignal(timeSignal[0]());

  // Start/pause the timer
  const [isActive, setActive] = createSignal(false);

  // Ref for dialog show/close on timer finish
  const [dialogRef, setDialogRef] = createSignal<HTMLDialogElement>(null);

  // Notification audio signal
  const [_, controls] = createAudio("/src/assets/audio/notif-sound.mp3");

  // Reset currCycle to first cycle when a new routine is selected
  createEffect(() => {
    setCycleIdx(0);
  });

  // Go to the next cycle (or reset routine if finished)
  const goToNextCycle = () => {
    setCycleIdx((i) => (i + 1) % props.routine().length);
    timeSignal[1](currCycle().duration);
    setRuntime(currCycle().duration);
    setActive(false);
    dialogRef().close();
  };

  const finished = () => {
    console.log("Timer finished in ", runtime() - timeSignal[0](), " seconds");
    // If not break, save cycle to DB
    // If timer finished manually, don't show modal
    if (timeSignal[0]() > 0) {
      goToNextCycle();
    }
    // Else, start next cycle
    dialogRef().showModal();
    controls.play();
  };

  const dropped = () => {
    console.log("Timer dropped in ", runtime() - timeSignal[0](), " seconds");
    // Don't get to next cycle. Just reset timers.
    timeSignal[1](currCycle().duration);
    setRuntime(currCycle().duration);
    setActive(false);
  };

  // Add one minute to both timer and runtime
  const addOneMinute = () => {
    timeSignal[1]((t) => t + 1 * 60);
    setRuntime((t) => t + 1 * 60);
  };

  return {
    timeSignal,
    isActive,
    setActive,
    finished,
    dropped,
    addOneMinute,
    dialogRef,
    setDialogRef,
    goToNextCycle,
  };
};

// Context creation (bloatware)
type ContextType = ReturnType<typeof TimerContextValue>;

const TimerContext = createContext<ContextType>();

export const TimerContextProvider = (props: TimerContextProps) => (
  <TimerContext.Provider value={TimerContextValue(props)}>
    {props.children}
  </TimerContext.Provider>
);

export function useTimerContext() {
  return useContext(TimerContext);
}
