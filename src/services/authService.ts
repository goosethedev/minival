import { db } from "./_db";

// Establish connection to the DB
export const connectDB = async ({ online = false }) => {
  if (!online) {
    await connectLocalDB();
    await setupLocalDB();
  }
  // TODO: Else, connect to remote DB instance
  return await db.info();
};

// Close connection (when exiting the app)
export const disconnectDB = async () => {
  await db.close();
};

// Connect to local DB (IndexedDB)
const connectLocalDB = async () => {
  try {
    await db.connect("indxdb://omnipomo", {
      namespace: "omnipomo",
      database: "omnipomo",
    });
  } catch (error) {
    console.error("Couldn't connect to local Surreal instance.", error);
  }
};

// Create tables if don't exist
const setupLocalDB = async () => {
  try {
    await db.query(`
      DEFINE TABLE pomos SCHEMAFULL;
      DEFINE FIELD created_at ON TABLE pomos TYPE datetime DEFAULT time::now();
      DEFINE FIELD duration ON TABLE pomos TYPE duration;
    `);
  } catch (error) {
    console.error("Couldn't set up offline tables.", error);
  }
};
