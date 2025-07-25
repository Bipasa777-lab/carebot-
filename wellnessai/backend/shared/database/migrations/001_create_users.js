const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../../../node-server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wellnessai';

const runMigration = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const exists = collections.find(col => col.name === 'users');

    if (exists) {
      console.log('⚠️  Collection "users" already exists. Skipping creation.');
      return process.exit(0);
    }

    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'profile'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'User email address'
            },
            password: {
              bsonType: 'string',
              description: 'Hashed password'
            },
            profile: {
              bsonType: 'object',
              required: ['firstName', 'lastName'],
              properties: {
                firstName: { bsonType: 'string' },
                lastName: { bsonType: 'string' },
                age: { bsonType: 'int' },
                gender: { enum: ['male', 'female', 'other'] },
                bloodGroup: { bsonType: 'string' },
                allergies: { bsonType: ['array'] },
                chronicConditions: { bsonType: ['array'] }
              }
            },
            preferences: {
              bsonType: 'object'
            },
            emergencyContacts: {
              bsonType: 'array'
            },
            isActive: {
              bsonType: 'bool'
            },
            createdAt: {
              bsonType: 'date'
            },
            updatedAt: {
              bsonType: 'date'
            }
          }
        }
      }
    });

    // Create unique index on email
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    console.log('✅ "users" collection created successfully with validation and indexes.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  }
};

runMigration();
