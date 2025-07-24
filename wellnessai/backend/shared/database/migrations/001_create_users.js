module.exports = {
  async up(db) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password', 'profile'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            profile: {
              bsonType: 'object',
              required: ['firstName', 'lastName'],
              properties: {
                firstName: { bsonType: 'string' },
                lastName: { bsonType: 'string' },
                age: { bsonType: 'int' },
                gender: { bsonType: 'string' },
                bloodGroup: { bsonType: 'string' },
                allergies: { bsonType: 'array', items: { bsonType: 'string' } },
                chronicConditions: { bsonType: 'array', items: { bsonType: 'string' } }
              }
            }
          }
        }
      }
    });
  },
  async down(db) {
    await db.collection('users').drop();
  }
};