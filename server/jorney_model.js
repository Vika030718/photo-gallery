// CREATE TABLE jorney( id SERIAL PRIMARY KEY, title TEXT, start_date DATE, end_date DATE, description TEXT, creation_date NUMERIC);
// INSERT INTO jorney (title, start_date, end_date, description, creation_date) VALUES ('Spain', '2021-11-03', '2021-11-08', 'Jorney to Spain', '1646986027008');
// INSERT INTO jorney (title, start_date, end_date, description, creation_date) VALUES ('Cyprus', '2022-02-03', '2022-02-12', 'Jorney to Cyprus', '1646986027005');

const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "admin",
//   host: "localhost",
//   database: "my_jorneys",
//   password: "root",
//   port: 5432,
// });

const pool = new Pool({
  user: "jkjjtqyzqxoith",
  host: "ec2-35-168-194-15.compute-1.amazonaws.com",
  database: "d3gq3dnm7l2rkp",
  password: "37d8d42af3ba7e0a67be526bbb810850409387ee56bb867a6b75bf2d93026149s",
  port: 5432,
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
