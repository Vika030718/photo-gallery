require("dotenv").config();
const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  // ssl: isProduction,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getJorneys = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM jorney ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const getJorney = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM jorney WHERE creation_date = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const createJorney = (body) => {
  return new Promise(function (resolve, reject) {
    const { title, start_date, end_date, description, creation_date } = body;
    pool.query(
      "INSERT INTO jorney (title, start_date, end_date, description, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, start_date, end_date, description, creation_date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};
const deleteJorney = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("Inside model");
    pool.query(
      "DELETE FROM jorney WHERE creation_date = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`jorney deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getJorneys,
  createJorney,
  deleteJorney,
  getJorney,
};
