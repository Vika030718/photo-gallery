const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { response } = require("express");
const merchant_model = require("./merchant_model");
const fs = require("fs");

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});
app.listen(port, () => console.log("Backend server live on " + port));

// Upload Endpoint
app.put("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const jorney_id = req.body.jorney_id;

  file.mv(
    `${__dirname}/client/public/uploads/${jorney_id}/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  );
});

app.get("/all", (req, res) => {
  merchant_model
    .getMerchants()
    .then((response) => {
      const new_resp = response.map((item, i) => {
        const files_names = fs.readdirSync(
          `${__dirname}/client/public/uploads/${item.creation_date}/banner/`,
          (err, files) => {
            return files;
          }
        );
        if (files_names.length !== 0) {
          const images = {};
          const new_res = files_names.map((file_name, i) => {
            const image_name = `image_${i}`;
            images[`${image_name}`] = file_name;
          });
          item.images = images;
          return item;
        }
        return item;
      });
      console.log(response);
      res.status(200).send(new_resp);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/:id", (req, res) => {
  merchant_model
    .getJorney(req.params.id)
    .then((response) => {
      const new_resp = response.map((item, i) => {
        const files_names = fs.readdirSync(
          `${__dirname}/client/public/uploads/${item.creation_date}/photos`,
          (err, files) => {
            return files;
          }
        );
        if (files_names.length !== 0) {
          const images = [];
          const new_res = files_names.map((file_name, i) => {
            const image_name = `image_${i}`;
            images[i] = file_name;
          });
          item.images = images;
          return item;
        }
        return item;
      });
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/merchants", (req, res) => {
  merchant_model
    .createMerchant(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/merchants/:id", (req, res) => {
  merchant_model
    .deleteMerchant(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
