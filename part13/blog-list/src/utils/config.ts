import 'dotenv/config';

const { PORT, DATABASE_URL, SECRET_KEY } = process.env;

if (!DATABASE_URL) throw new Error('You must provide a DATABASE URL');
if (!SECRET_KEY) throw new Error('You must provide a SECRET KEY');

export default {
  PORT,
  DATABASE_URL,
  SECRET_KEY,
};
