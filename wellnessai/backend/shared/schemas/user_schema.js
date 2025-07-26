module.exports = {
  type: "object",
  required: ["email", "password", "profile"],
  properties: {
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      minLength: 6
    },
    profile: {
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "integer", minimum: 0 },
        gender: { type: "string", enum: ["male", "female", "other"] },
        bloodGroup: { type: "string" },
        allergies: {
          type: "array",
          items: { type: "string" }
        },
        chronicConditions: {
          type: "array",
          items: { type: "string" }
        }
      }
    },
    preferences: {
      type: "object",
      properties: {
        language: { type: "string", default: "en" },
        notifications: { type: "boolean", default: true },
        dataPrivacy: { type: "string", enum: ["local", "cloud"] }
      }
    }
  }
};
