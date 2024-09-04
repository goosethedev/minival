import { Schedule } from "../globals/types";

const schedules: Schedule[] = [
  {
    name: "Default",
    work: 25,
    break: 5,
    longBreak: 15,
    spacing: 2,
  },
  {
    name: "Quick",
    work: 15,
    break: 2,
    longBreak: 3,
    spacing: 3,
  },
  {
    name: "Long",
    work: 55,
    break: 13,
    longBreak: 25,
    spacing: 3,
  },
];

export const getSchedules = async (): Promise<Schedule[]> => {
  return schedules;
};

export const insertSchedule = async (newSchedule: Schedule) => {
  schedules.push(newSchedule);
};
