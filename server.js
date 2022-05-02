const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { response } = require("express");
const jorney_model = require("./server/jorney_model");
const fs = require("fs");

// Function to serve all static files
// inside public directory.
app.use(express.static("server"));
app.use("/uploads", express.static("uploads"));

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

function add_images_to_jorney(item) {
  const files_names = fs.readdirSync(
    `${__dirname}/server/uploads/${item.creation_date}/photos/`,
    (err, files) => {
      return files;
    }
  );

  const banner_name = fs.readdirSync(
    `${__dirname}/server/uploads/${item.creation_date}/banner/`,
    (err, files) => {
      return files;
    }
  );

  if (files_names.length !== 0 || banner_name !== 0) {
    item.images = {
      banner_name: banner_name[0],
      photos_names: files_names,
    };
    return item;
  }
  return item;
}

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  // file.name = Date.now();

  if (req.body.isBanner === "true") {
    const old_banner_name = fs.readdirSync(
      `${__dirname}/server/uploads/${req.body.jorney_id}/banner/`,
      (err, files) => {
        return files;
      }
    );

    if (old_banner_name.length !== 0) {
      fs.unlink(
        `${__dirname}/server/uploads/${req.body.jorney_id}/banner/${old_banner_name}`,
        function (err) {
          if (err) throw err;
          console.log("File deleted!");
        }
      );
    }
  }

  dir =
    req.body.isBanner === "true"
      ? `${__dirname}/server/uploads/${req.body.jorney_id}/banner/${file.name}`
      : `${__dirname}/server/uploads/${req.body.jorney_id}/photos/${file.name}`;

  file.mv(dir, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: dir });
  });
});

app.get("/", (req, res) => {
  jorney_model
    .getJorneys()
    .then((response) => {
      const new_resp = response.map((item, i) => {
        return add_images_to_jorney(item);
      });
      res.status(200).send(new_resp);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getjorney/:id", (req, res) => {
  jorney_model
    .getJorney(req.params.id)
    .then((response) => {
      const new_resp = response.map((item, i) => {
        return add_images_to_jorney(item);
      });

      res.status(200).send(new_resp);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/addnewjorney", (req, res) => {
  jorney_model
    .createJorney(req.body)
    .then((response) => {
      let dir = `${__dirname}/server/uploads/${response.creation_date}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.mkdirSync(`${dir}/banner`);
        fs.mkdirSync(`${dir}/photos`);
      }
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

function deleteJorneyFolder(path) {
  let files = fs.readdirSync(path);

  if (files.length > 0) {
    console.log(path + " " + files.length + " " + files);
    fs.rmSync(
      path,
      {
        recursive: true,
        force: true,
      },
      (error) => {
        console.log("First Try");
        console.log(error);
      }
    );
    console.log("Delete INFO");
  } else if (files.length == 0) return "Everything is clean";
  return "Everything is clean";
}

app.delete("/jorney/:id", (req, res) => {
  console.log(req.params);
  jorney_model
    .deleteJorney(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });

  let path = `${__dirname}/server/uploads/${req.params.id}`;
  console.log(deleteJorneyFolder(path));
  console.log(deleteJorneyFolder(path));
});
