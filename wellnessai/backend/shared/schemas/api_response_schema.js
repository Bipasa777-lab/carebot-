module.exports = {
  type: "object",
  required: ["response"],
  properties: {
    response: {
      type: "object",
      required: ["message"],
      properties: {
        message: { type: "string" },
        formatted: { type: "boolean" },
        medical_grade: { type: "boolean" }
      }
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 1
    },
    source: {
      type: "string"
    },
    disclaimer: {
      type: "string"
    },
    timestamp: {
      type: "string",
      format: "date-time"
    },
    error: {
      type: "boolean"
    }
  }
};
