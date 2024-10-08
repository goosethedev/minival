import { Schedule } from "@/globals/types";
import { batch, createEffect, createSignal } from "solid-js";

type Interval = {
  duration: number;
  isBreak: boolean;
};

const createSchedule = (initialSchedule: Schedule) => {
  // Schedule
  const [schedule, setSchedule] = createSignal(initialSchedule);
  // Track current interval index (0 - n-1)
  const [index, setIndex] = createSignal(0);

  // Build an Interval from a schedule and the current index
  const buildInterval = (schedule: Schedule, index: number): Interval => {
    const isBreak = index % 2 == 1;
    const isLongBreak = index == schedule.spacing * 2 - 1;
    const duration = isLongBreak
      ? schedule.longBreak
      : isBreak
        ? schedule.break
        : schedule.work;
    return { isBreak, duration };
  };

  // If a new schedule is set, set the index to zero
  createEffect(() => schedule() && setIndex(0));

  return {
    currentInterval: () => batch(() => buildInterval(schedule(), index())),
    setNextInterval: () => setIndex((i) => (i + 1) % (schedule().spacing * 2)),
    currentSchedule: () => schedule(),
    setSchedule,
  };
};

export default createSchedule;
