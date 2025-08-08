import { Sequelize } from 'sequelize';
import config from './config';
import logger from './logger';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelize = new Sequelize(config.DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);

  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    console.log('connected to the database');
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('fail to connect to db');
      process.exit(1);
    }
  }
};
