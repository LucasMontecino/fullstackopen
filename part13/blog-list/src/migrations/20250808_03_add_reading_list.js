const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('reading_list', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    readed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('reading_list');
}

module.exports = { up, down };
