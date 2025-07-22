import 'dotenv/config';

const { PORT, DATABASE_URL } = process.env;

if (!DATABASE_URL) throw new Error('You must provide a DATABASE URL');

export default {
  PORT,
  DATABASE_URL,
};
