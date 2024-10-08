import { Pomo } from "@/globals/types";
import dayjs from "dayjs";

const pomos = [];

export const insertPomo = async (duration: number, tag: string) => {
  let pomo: Pomo = { duration, tag, created_at: dayjs() };
  pomos.push(pomo);
};

export const getTodayPomoCount = async (): Promise<number> => {
  return pomos.length;
};

export const getPomos = async (): Promise<Pomo[]> => {
  return pomos;
};
