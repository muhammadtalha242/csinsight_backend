'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

require('dotenv').config();

const db = {};

let sequelize;
// const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT } = process.env;
// sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, { dialect: DB_DIALECT, host: DB_HOST, logging: false });

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, { dialect: 'postgres', host: POSTGRES_HOST, logging: false });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch(error => {
    console.error('Error syncing models:', error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
