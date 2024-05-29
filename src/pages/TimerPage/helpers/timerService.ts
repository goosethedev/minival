import getDB from "../../../globals/db-config";

export const savePomo = async (duration: number) => {
  const db = await getDB();
  await db.query(
    "INSERT INTO pomos (duration) VALUES (duration::from::secs($duration));",
    { duration },
  );
};

export const getTodayPomoCount = async () => {
  const db = await getDB();
  let res = await db.query(
    "SELECT count() FROM pomos WHERE time::floor(created_at, 1d) == time::floor(time::now(), 1d) GROUP ALL;",
  );
  return res[0][0]?.count;
};
