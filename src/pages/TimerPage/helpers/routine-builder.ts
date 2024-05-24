import { Routine, RoutineBlueprint } from "../../../globals/types";

const DEFAULT_ROUTINE_BP: RoutineBlueprint = {
  work: 25 * 60,
  break: 5 * 60,
  long_break: 15 * 60,
  space: 3,
};

const TESTING_ROUTINE_BP: RoutineBlueprint = {
  work: 5,
  break: 2,
  long_break: 3,
  space: 2,
};

export const routineBuilder = (bp: RoutineBlueprint): Routine => {
  let routine: Routine = [];
  for (let s = 1; s <= bp.space; s++) {
    routine.push({ duration: bp.work, break: false });
    routine.push({
      duration: s == bp.space ? bp.long_break : bp.break,
      break: true,
    });
  }
  return routine;
};

export const DEFAULT_ROUTINE = routineBuilder(DEFAULT_ROUTINE_BP);
export const TESTING_ROUTINE = routineBuilder(TESTING_ROUTINE_BP);
