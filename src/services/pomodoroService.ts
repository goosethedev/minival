import dayjs from "dayjs";
import { Pomo } from "../globals/types";

const pomos = [];

export const insertPomo = async (duration: number) => {
  let pomo: Pomo = { duration, created_at: dayjs() };
  pomos.push(pomo);
};

export const getTodayPomoCount = async (): Promise<number> => {
  return pomos.length;
};

export const getPomos = async (): Promise<Pomo[]> => {
  return pomos;
};
