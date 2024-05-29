import dayjs from "dayjs";
import { db } from "./_db";
import { ID, Pomo } from "../globals/types";

export type DBPomo = {
  created_at: string;
  duration: number;
  id: ID;
};

export const insertPomo = async (duration: number) => {
  await db.query(
    "INSERT INTO pomos (duration) VALUES (duration::from::secs($duration));",
    { duration },
  );
};

export const getTodayPomoCount = async () => {
  let [res] = await db.query(
    "SELECT count() FROM pomos WHERE time::floor(created_at, 1d) == time::floor(time::now(), 1d) GROUP ALL;",
  );
  return res[0]?.count;
};

export const getPomos = async () => {
  const [res] = await db.query<DBPomo[][]>(
    `SELECT time::format(
              time::round(created_at, 1m), '%Y-%m-%dT%H:%M'
            ) as created_at,
            duration::secs(duration) as duration, id
     FROM pomos ORDER BY created_at DESC;`,
  );
  return res.map((r) => ({
    id: r.id,
    created_at: dayjs(r.created_at),
    duration: r.duration,
  })) as Pomo[];
};
