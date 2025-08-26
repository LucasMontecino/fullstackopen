const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('users', 'disabled');
}

module.exports = { up, down };
