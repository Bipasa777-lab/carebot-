module.exports = {
  async up(db) {
    await db.createCollection('chat_histories', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'sessionId', 'messages'],
          properties: {
            userId: { bsonType: 'objectId' },
            sessionId: { bsonType: 'string' },
            messages: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['sender', 'message'],
                properties: {
                  sender: { bsonType: 'string' },
                  message: { bsonType: 'string' },
                  timestamp: { bsonType: 'date' }
                }
              }
            }
          }
        }
      }
    });
  },
  async down(db) {
    await db.collection('chat_histories').drop();
  }
};