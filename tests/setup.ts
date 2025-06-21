import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
  console.log('MongoDB connected successfully!');
});

afterEach(async () => {
  if (!mongoose.connection.db) {
    console.warn('Mongoose not connected. Skipping cleanup.');
    return;
  }

  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
  console.log('MongoDB disconnected successfully!');
});
