module.exports = {
  async up(db) {
    await db.createCollection('medical_records', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'records'],
          properties: {
            userId: { bsonType: 'objectId' },
            records: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['diagnosis', 'treatment'],
                properties: {
                  diagnosis: { bsonType: 'string' },
                  treatment: { bsonType: 'string' },
                  date: { bsonType: 'date' }
                }
              }
            }
          }
        }
      }
    });
  },
  async down(db) {
    await db.collection('medical_records').drop();
  }
};
