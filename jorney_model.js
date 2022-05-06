const pool = require("./db.js");

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
