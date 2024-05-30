import { batch, createEffect, createSignal } from "solid-js";
import { Routine } from "../globals/types";

const DEFAULT_ROUTINE: Routine = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
  spacing: 3,
};

type Cycle = {
  duration: number;
  isBreak: boolean;
};

const createRoutine = () => {
  // Routine
  const [routine, setRoutine] = createSignal(DEFAULT_ROUTINE);
  // Track current cycle with an index
  const [index, setIndex] = createSignal(0);

  // Build a Cycle obj from a routine and the current index
  const buildCycle = (routine: Routine, index: number): Cycle => {
    const isBreak = index % 2 == 1;
    const isLongBreak = index == routine.spacing * 2 - 1;
    const duration = isLongBreak
      ? routine.longBreak
      : isBreak
        ? routine.break
        : routine.work;
    return { isBreak, duration };
  };

  // If a new routine is set, set the index to zero
  createEffect(() => routine() && setIndex(0));

  return {
    currentCycle: () => batch(() => buildCycle(routine(), index())),
    goToNextCycle: () => setIndex((i) => (i + 1) % (routine().spacing * 2)),
    changeRoutine: setRoutine,
  };
};

export default createRoutine;
