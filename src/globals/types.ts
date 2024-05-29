import { Dayjs } from "dayjs";

// Internal SurrealDB ID type
type ID = {
  id: string;
  tb: string;
};

export type User = {
  id: ID;
  email: string;
  token: string;
};

export type Pomo = {
  id: ID;
  duration: number;
  created_at: Dayjs;
};

export type DBPomo = {
  created_at: string;
  duration: number;
  id: ID;
};

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
