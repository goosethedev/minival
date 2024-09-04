import { Dayjs } from "dayjs";

export type User = {
  email: string;
  token: string;
};

export type Pomo = {
  duration: number;
  created_at: Dayjs;
};

export type Schedule = {
  name: string;
  work: number;
  break: number;
  longBreak: number;
  spacing: number;
};
