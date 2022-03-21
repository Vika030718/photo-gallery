// CREATE TABLE jorney( id SERIAL PRIMARY KEY, title TEXT, start_date DATE, end_date DATE, description TEXT, creation_date NUMERIC);
// INSERT INTO jorney (title, start_date, end_date, description, creation_date) VALUES ('Spain', '2021-11-03', '2021-11-08', 'Jorney to Spain', '1646986027008');
// INSERT INTO jorney (title, start_date, end_date, description, creation_date) VALUES ('Cyprus', '2022-02-03', '2022-02-12', 'Jorney to Cyprus', '1646986027005');

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "my_jorneys",
  password: "root",
  port: 5432,
});

const getMerchants = () => {
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
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteMerchant = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
  getJorney,
};
