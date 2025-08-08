import { connectToDB } from './db';

const runMigrations = async () => {
  try {
    await connectToDB();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();
