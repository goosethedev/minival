import dayjs from "dayjs";
import getDB from "../../../globals/db-config";
import { DBPomo, Pomo } from "../../../globals/types";

export const getPomos = async () => {
  const db = await getDB();

  const [res] = await db.query(
    `SELECT time::format(
              time::round(created_at, 1m), '%Y-%m-%dT%H:%M'
            ) as created_at,
            duration::secs(duration) as duration, id
     FROM pomos ORDER BY created_at DESC;`,
  );
  return res.map((r: DBPomo) => ({
    id: r.id,
    created_at: dayjs(r.created_at),
    duration: r.duration,
  })) as Pomo[];
};
