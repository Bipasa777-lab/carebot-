module.exports = {
  async up(db) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'profile'],
          properties: {
            email: { bsonType: 'string' },
            password: { bsonType: 'string' },
            profile: {
              bsonType: 'object',
              required: ['firstName', 'lastName'],
              properties: {
                firstName: { bsonType: 'string' },
                lastName: { bsonType: 'string' },
                age: { bsonType: 'int' },
                gender: { enum: ['male', 'female', 'other'] },
                bloodGroup: { bsonType: 'string' },
                allergies: {
                  bsonType: 'array',
                  items: { bsonType: 'string' }
                },
                chronicConditions: {
                  bsonType: 'array',
                  items: { bsonType: 'string' }
                }
              }
            },
            emergencyContacts: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['name', 'phone'],
                properties: {
                  name: { bsonType: 'string' },
                  phone: { bsonType: 'string' },
                  relationship: { bsonType: 'string' }
                }
              }
            },
            preferences: {
              bsonType: 'object',
              properties: {
                language: { bsonType: 'string' },
                notifications: { bsonType: 'bool' },
                dataPrivacy: { bsonType: 'string' }
              }
            },
            isActive: { bsonType: 'bool' },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });

    // Optional: add index on email
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },

  async down(db) {
    await db.collection('users').drop();
  }
};
