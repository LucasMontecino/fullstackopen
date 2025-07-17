const { PORT } = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');
const connectDB = require('./db');

const port = PORT ?? 3001;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    logger.info(`Server running on port http://localhost:${port}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
