const { Pool } = require("pg");
let isProduction = false;
let ssl = false;

if (process.env.NODE_ENV === "production") {
  isProduction = true;
  ssl = { rejectUnauthorized: false };
} else {
  require("dotenv").config();
}

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: ssl,
});

module.exports = pool;
