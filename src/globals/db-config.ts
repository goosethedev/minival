import { Surreal } from "surrealdb.js";
import { surrealdbWasmEngines } from "surrealdb.wasm";

let db = null;

const getDB = async () => {
  if (db) return db;

  try {
    db = new Surreal({
      engines: surrealdbWasmEngines(),
    });
    // For IndexedDB: indxdb://omnipomo
    await db.connect("indxdb://omnipomo", {
      namespace: "omnipomo",
      database: "omnipomo",
    });

    // await db.signin({
    //   namespace: "pomo",
    //   database: "pomo",
    //   scope: "account",
    //   email: "test@test.com",
    //   pass: "testtest",
    // });

    // Create tables if don't exist
    await db.query(`
      DEFINE TABLE pomos SCHEMAFULL;
      DEFINE FIELD created_at ON TABLE pomos TYPE datetime DEFAULT time::now();
      DEFINE FIELD duration ON TABLE pomos TYPE duration;
    `);

    return db;
  } catch (error) {
    console.error("Could connect to Surreal database: ", error);
  }
};

export default getDB;
