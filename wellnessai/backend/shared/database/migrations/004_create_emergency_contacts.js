module.exports = {
  async up(db) {
    await db.createCollection('emergency_contacts', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'contacts'],
          properties: {
            userId: { bsonType: 'objectId' },
            contacts: {
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
            }
          }
        }
      }
    });
  },
  async down(db) {
    await db.collection('emergency_contacts').drop();
  }
};
