import { Routine, RoutineBlueprint } from "../../helpers/types";

const DEFAULT_ROUTINE_BP: RoutineBlueprint = {
  work: 25,
  break: 5,
  long_break: 15,
  space: 3,
};

export const routineBuilder = (blueprint: RoutineBlueprint): Routine => {
  let routine: Routine = [];
  for (let s = 1; s <= blueprint.space; s++) {
    routine.push({ duration: blueprint.work * 60, break: false });
    routine.push({
      duration:
        60 * (s == blueprint.space ? blueprint.long_break : blueprint.break),
      break: true,
    });
  }
  return routine;
};

export const DEFAULT_ROUTINE = routineBuilder(DEFAULT_ROUTINE_BP);
