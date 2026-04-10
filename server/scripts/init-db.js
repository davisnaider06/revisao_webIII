const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopping-list';

async function run() {
  await mongoose.connect(MONGO_URI, { dbName: undefined });
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  const names = collections.map(c => c.name);

  if (!names.includes('items')) {
    await db.createCollection('items');
    console.log('Created collection: items');
  } else {
    console.log('Collection "items" already exists');
  }

  // Ensure an index on name for faster lookups
  await db.collection('items').createIndex({ name: 1 });
  console.log('Ensured index on items.name');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

run().catch(err => {
  console.error('Error initializing DB:', err);
  process.exit(1);
});
