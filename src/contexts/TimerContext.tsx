import { createContextProvider } from "@solid-primitives/context";
import { createResource, createSignal } from "solid-js";

import { Schedule } from "../globals/types";
import { getTodayPomoCount, insertPomo } from "../services/pomodoroService";
import createSchedule from "../utils/createSchedule";
import createTimer from "../utils/createTimer";
import { useDialogContext } from "./DialogContext";

export const [TimerProvider, useTimerContext] = createContextProvider(() => {
  // Use dialogs from the TimerPageContext
  const { openTimerFinishedDialog } = useDialogContext();

  // TODO: Retrieve schedule from DB
  const TESTING_SCHEDULE: Schedule = {
    name: "Testing",
    work: 5 / 60,
    break: 2 / 60,
    longBreak: 3 / 60,
    spacing: 2,
  };

  // Timer helper signals
  const intervalSeconds = () => currentInterval().duration * 60;
  const remainingToMinutes = () =>
    Math.ceil((intervalSeconds() - timer()) / 60);

  // Timer and Interval API from schedule blueprint
  const { currentInterval, setNextInterval, switchSchedule } =
    createSchedule(TESTING_SCHEDULE);
  const [timer, resetTimer, [isTimerActive, setTimerActive]] = createTimer(
    intervalSeconds(), // Initial time. Timer uses seconds
    openTimerFinishedDialog, // Call notification modal when finished
  );

  // Switch to a new schedule and reset the timer
  const setSchedule = (schedule: Schedule) => {
    switchSchedule(schedule);
    resetTimer(intervalSeconds());
  };

  // Go to the next interval (or reset routine if finished)
  const goToNextInterval = async ({ autostart = false, saveLast = true }) => {
    // Save cycle if not dropped and is wasn't a break
    if (saveLast && !currentInterval().isBreak) {
      await insertPomo(remainingToMinutes());
      pomoCountMutate((c) => c + 1);
    }
    // Start next interval in schedule
    setNextInterval();
    resetTimer(intervalSeconds());
    setTimerActive(autostart);
  };

  // Tags
  // TODO: Retrieve tags from DB
  const globalTags = ["Work", "Study", "Spanish"];
  const [currentTag, setCurrentTag] = createSignal(globalTags[0]);

  // Filter tag function
  const searchTag = (keyword: string) =>
    keyword === ""
      ? globalTags
      : globalTags.filter((tag) =>
        tag.toLowerCase().includes(keyword.toLowerCase()),
      );

  // Get count of pomos completed today
  const [completedPomos, { mutate: pomoCountMutate }] =
    createResource<number>(getTodayPomoCount);

  return {
    // Schedule
    setSchedule,
    // Timer
    getTimer: () => timer(),
    toggleTimer: () => setTimerActive((t) => !t),
    isTimerActive: () => isTimerActive(),
    isTimerPristine: () => timer() === intervalSeconds() && !isTimerActive(),
    // Interval
    finishInterval: () => goToNextInterval({}),
    startNextInterval: () => goToNextInterval({ autostart: true }),
    resetInterval: () => resetTimer(intervalSeconds()),
    // Tags
    currentTag,
    setCurrentTag,
    searchTag,
    // API calls
    completedPomos,
  };
});
