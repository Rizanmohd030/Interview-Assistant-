require('dotenv').config({ path: './backend/.env' });
console.log('🔑 GEMINI_API_KEY:', process.env.GEMINI_API_KEY);

const app = require('./src/app');
const config = require('./src/config/env.config');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📌 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
});