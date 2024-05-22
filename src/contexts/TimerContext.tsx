import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { Routine } from "../helpers/types";

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
  };

  const finished = () => {
    console.log("Timer finished in ", runtime() - timeSignal[0](), " seconds");
    // If not break, save cycle to DB
    goToNextCycle();
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
