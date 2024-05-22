export type RoutineBlueprint = {
  work: number;
  break: number;
  long_break: number;
  space: number;
};

export type RoutineCycle = {
  duration: number;
  break: boolean;
};

export type Routine = RoutineCycle[];
