import {
  ParentProps,
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { createAudio } from "@solid-primitives/audio";
import createTimer from "../utils/createTimer";
import { getTodayPomoCount, insertPomo } from "../services/pomodoroService";
import createRoutine from "../utils/createRoutine";

interface PomodoroContextProps extends ParentProps {}

const PomodoroContextValue = () => {
  // Routine
  const { currentCycle, goToNextCycle } = createRoutine();

  // Timer
  const [timer, resetTimer, [isTimerActive, setTimerActive]] = createTimer(
    currentCycle().duration,
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
  const setNextCycle = async ({ autostart = false, saveLast = true }) => {
    dialogRef().close(); // Close modal if open
    // Save cycle if not dropped and is wasn't a break
    if (saveLast && !currentCycle().isBreak) {
      await insertPomo(currentCycle().duration - timer());
      pomoCountMutate((c) => c + 1);
    }
    // Set next cycle
    goToNextCycle();
    resetTimer(currentCycle().duration);
    setTimerActive(autostart);
  };

  // Get count of pomos completed today
  const [completedPomos, { mutate: pomoCountMutate }] =
    createResource<number>(getTodayPomoCount);

  return {
    getTimer: () => timer(),
    toggleTimer: () => setTimerActive((t) => !t),
    finishCycle: () => setNextCycle({}),
    startNextCycle: () => setNextCycle({ autostart: true }),
    dropCycle: () => setNextCycle({ saveLast: false }),
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
