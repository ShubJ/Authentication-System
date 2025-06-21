// src/db/index.ts
import { DBClient } from './db.types';
import { MongoClient } from './mongo/mongoClient';

export const initDb = async (): Promise<DBClient> => {
  const db = new MongoClient();
  await db.connect();
  return db;
};

export const disconnectDb = async (db: DBClient): Promise<void> => {
  await db.disconnect();
};
