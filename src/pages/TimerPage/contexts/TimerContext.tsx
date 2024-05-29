import {
  Accessor,
  ParentProps,
  batch,
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { createAudio } from "@solid-primitives/audio";
import { Routine } from "../../../globals/types";
import createTimer from "../helpers/createTimer";
import { getTodayPomoCount, savePomo } from "../helpers/timerService";

interface TimerContextProps extends ParentProps {
  // List of pomos to run sequencially
  routine: Accessor<Routine>;
}

const TimerContextValue = (props: TimerContextProps) => {
  // Track current cycle - reset to first one when routine changes
  const [cycleIdx, setCycleIdx] = createSignal(0);
  const cycle = () => batch(() => props.routine()[cycleIdx()]);
  createEffect(() => props.routine() && setCycleIdx(0));

  // Timer
  const [timer, resetTimer, [isTimerActive, setTimerActive]] = createTimer(
    cycle().duration,
    // Call notification modal when finished
    () => {
      dialogRef().showModal();
      controls.play();
    },
  );

  // Ref for dialog show/close on timer finish
  const [dialogRef, setDialogRef] = createSignal<HTMLDialogElement>(null);
  // Notification audio signal
  const [_, controls] = createAudio("/src/assets/audio/notif-sound.mp3");

  // Go to the next cycle (or reset routine if finished)
  const goToNextCycle = async ({ autostart = false, saveLast = true }) => {
    dialogRef().close(); // Close modal if open
    // If dropped, cycle won't be saved
    if (saveLast && !cycle().break) {
      await savePomo(cycle().duration - timer());
      pomoCountMutate((c) => c + 1);
    }
    // Set next cycle
    setCycleIdx((i) => (i + 1) % props.routine().length);
    resetTimer(cycle().duration);
    setTimerActive(autostart);
  };

  // Get count of pomos completed today
  const [completedPomos, { mutate: pomoCountMutate }] =
    createResource<number>(getTodayPomoCount);

  return {
    getTimer: () => timer(),
    toggleTimer: () => setTimerActive((t) => !t),
    finishCycle: () => goToNextCycle({}),
    startNextCycle: () => goToNextCycle({ autostart: true }),
    dropCycle: () => goToNextCycle({ saveLast: false }),
    isTimerActive,
    setDialogRef,
    completedPomos,
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
