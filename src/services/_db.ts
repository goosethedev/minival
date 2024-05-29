import { Surreal } from "surrealdb.js";
import { surrealdbWasmEngines } from "surrealdb.wasm";

let dbInstance: Surreal = null;

const setInstance = () => {
  dbInstance = new Surreal({
    engines: surrealdbWasmEngines(),
  });
  return dbInstance;
};

export const db = dbInstance || setInstance();
