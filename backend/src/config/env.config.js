require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || "",
  nodeEnv: process.env.NODE_ENV || "development",
};
