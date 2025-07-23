import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';
import logger from '../utils/logger';

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;
  declare author?: string;
  declare url: string;
  declare title: string;
  declare likes: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'blog',
  }
);

Blog.sync()
  .then(() => logger.info('successfully created blogs'))
  .catch((err) => logger.error(err));

export default Blog;
