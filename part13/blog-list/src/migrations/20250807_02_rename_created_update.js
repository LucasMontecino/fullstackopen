const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.renameColumn('users', 'createdAt', 'created_at');
  await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
  await queryInterface.renameColumn('blogs', 'createdAt', 'created_at');
  await queryInterface.renameColumn('blogs', 'updatedAt', 'updated_at');
}

async function down({ context: queryInterface }) {
  await queryInterface.renameColumn('users', 'created_at', 'createdAt');
  await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');
  await queryInterface.renameColumn('blogs', 'created_at', 'createdAt');
  await queryInterface.renameColumn('blogs', 'updated_at', 'updatedAt');
}

module.exports = { up, down };
