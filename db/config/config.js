const { NODE_ENV } = process.env;

require('dotenv').config({ path: `${__dirname}/./../../.env` });

const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    dialect: "postgres"
  },
  staging: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: POSTGRES_HOST,
    dialect: "postgres"
  },
}