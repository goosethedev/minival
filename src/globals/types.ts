import { Dayjs } from "dayjs";

// Internal SurrealDB ID type
export type ID = {
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

export type Routine = {
  work: number;
  break: number;
  longBreak: number;
  spacing: number;
};
