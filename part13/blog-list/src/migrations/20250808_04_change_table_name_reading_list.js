const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.renameTable('reading_list', 'reading_lists');
}

async function down({ context: queryInterface }) {
  await queryInterface.renameTable('reading_lists', 'reading_list');
}

module.exports = { up, down };
