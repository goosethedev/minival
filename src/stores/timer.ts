import { Schedule } from "@/globals/types";
import createSchedule from "@/utils/createSchedule";
import createTimer from "@/utils/createTimer";
import { onTimerFinish } from "@/logic/TimerManager";
import { createRoot } from "solid-js";

export const timer = createRoot(() => {
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

  // Timer and Interval API from schedule blueprint
  const { currentInterval, setNextInterval, currentSchedule, setSchedule } =
    createSchedule(TESTING_SCHEDULE);
  const [timer, resetTimer, [isTimerActive, setTimerActive]] = createTimer(
    intervalSeconds(), // Initial time. Timer uses seconds
    onTimerFinish
  );

  // TODO: createEffect - everytime the current interval or schedule changes, reset the timer

  // External API
  return {
    // Schedule
    currentSchedule,
    switchSchedule: (schedule: Schedule) => {
      setSchedule(schedule);
      resetTimer(intervalSeconds());
    },
    // Timer
    getTimer: () => timer(),
    toggleTimer: () => setTimerActive((t) => !t),
    isTimerActive: () => isTimerActive(),
    isTimerPristine: () => timer() === intervalSeconds() && !isTimerActive(),
    // Interval
    getInterval: () => currentInterval(),
    resetInterval: () => resetTimer(intervalSeconds()),
    goToNextInterval: (autostart: boolean) => {
      setNextInterval();
      resetTimer(intervalSeconds());
      setTimerActive(autostart);
    }
  };
})

