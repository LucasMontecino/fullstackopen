const { DataTypes } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    defaultValue: new Date().getFullYear(),
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('blogs', 'year');
}

module.exports = { up, down };
