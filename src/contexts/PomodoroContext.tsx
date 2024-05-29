import {
  ParentProps,
  batch,
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { createAudio } from "@solid-primitives/audio";
import createTimer from "../utils/createTimer";
import { TESTING_ROUTINE } from "../utils/routineBuilder";
import { getTodayPomoCount, insertPomo } from "../services/pomodoroService";

interface PomodoroContextProps extends ParentProps { }

const PomodoroContextValue = () => {
  // Routine
  const [routine, _setRoutine] = createSignal(TESTING_ROUTINE);

  // Track current cycle - reset to first one when routine changes
  const [cycleIdx, setCycleIdx] = createSignal(0);
  const cycle = () => batch(() => routine()[cycleIdx()]);
  createEffect(() => routine() && setCycleIdx(0));

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
      await insertPomo(cycle().duration - timer());
      pomoCountMutate((c) => c + 1);
    }
    // Set next cycle
    setCycleIdx((i) => (i + 1) % routine().length);
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
type ContextType = ReturnType<typeof PomodoroContextValue>;

const PomodoroContext = createContext<ContextType>();

export const PomodoroContextProvider = (props: PomodoroContextProps) => (
  <PomodoroContext.Provider value={PomodoroContextValue()}>
    {props.children}
  </PomodoroContext.Provider>
);

export function usePomodoroContext() {
  return useContext(PomodoroContext);
}
