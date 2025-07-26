module.exports = {
  type: "object",
  required: ["query", "userId"],
  properties: {
    query: {
      type: "string",
      minLength: 5
    },
    userId: {
      type: "string"
    },
    context: {
      type: "object",
      properties: {
        symptoms: {
          type: "array",
          items: { type: "string" }
        },
        category: { type: "string" },
        urgency: { type: "string", enum: ["low", "medium", "high"] }
      },
      additionalProperties: false
    },
    timestamp: {
      type: "string",
      format: "date-time"
    }
  }
};
