import { Sequelize } from 'sequelize';
import config from './utils/config';

const sequelize = new Sequelize(config.DATABASE_URL);

export default sequelize;
