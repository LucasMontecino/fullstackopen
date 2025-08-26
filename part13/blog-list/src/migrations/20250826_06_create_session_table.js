const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  await queryInterface.addColumn('sessions', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('sessions');
}

module.exports = { up, down };
