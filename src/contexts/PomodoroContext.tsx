import { createResource, createSignal } from "solid-js";
import { createContextProvider } from "@solid-primitives/context";
import { getTodayPomoCount, insertPomo } from "../services/pomodoroService";
import createTimer from "../utils/createTimer";
import createRoutine from "../utils/createRoutine";
import { useTimerPageContext } from "./TimerPageContext";

export const [PomodoroProvider, usePomodoroContext] = createContextProvider(
  () => {
    // Use dialogs from the TimerPageContext
    const { openTimerFinishedDialog, closeTimerFinishedDialog } =
      useTimerPageContext();

    // Routine
    const { currentCycle, goToNextCycle } = createRoutine();

    // Timer
    const [timer, resetTimer, [isTimerActive, setTimerActive]] = createTimer(
      currentCycle().duration, // Initial time
      openTimerFinishedDialog, // Call notification modal when finished
    );

    // Tags
    const globalTags = ["Work", "Study", "Spanish"];
    const [currentTag, setCurrentTag] = createSignal(globalTags[0]);

    // Go to the next cycle (or reset routine if finished)
    const setNextCycle = async ({ autostart = false, saveLast = true }) => {
      closeTimerFinishedDialog(); // Close modal if open
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
      // Timer
      getTimer: () => timer(),
      isTimerActive: () => isTimerActive(),
      toggleTimer: () => setTimerActive((t) => !t),
      isTimerPristine: () =>
        timer() === currentCycle().duration && !isTimerActive(),
      // Cycle
      finishCycle: () => setNextCycle({}),
      startNextCycle: () => setNextCycle({ autostart: true }),
      dropCycle: () => setNextCycle({ saveLast: false }),
      resetCycle: () => resetTimer(currentCycle().duration),
      // Tags
      globalTags,
      currentTag,
      setCurrentTag,
      // API calls
      completedPomos,
    };
  },
);
