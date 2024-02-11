// pages/api/getData.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

// Create a new MongoClient instance
const client = new MongoClient(uri);

async function connectToDatabase() {
  // Connect to the client and get the database
  await client.connect();
  const db = client.db(dbName);
  return db;
}

export default async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: "Failed to connect to the database or fetch data" });
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
};
