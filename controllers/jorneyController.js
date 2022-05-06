const jorney_model = require("../jorney_model");
const path = require("path");

const fs = require("fs");

function add_images_to_jorney(item) {
  const jorney_path = path.join(
    __dirname,
    "..",
    `uploads/${item.creation_date}`
  );
  if (!fs.existsSync(jorney_path)) {
    return false;
  }
  const files_names = fs.readdirSync(`${jorney_path}/photos/`, (err, files) => {
    return files;
  });

  const banner_name = fs.readdirSync(`${jorney_path}/banner/`, (err, files) => {
    return files;
  });

  if (files_names.length !== 0 || banner_name !== 0) {
    item.images = {
      banner_name: banner_name[0],
      photos_names: files_names,
    };
    return item;
  }
  return item;
}

exports.jorney_upload = (req, res) => {
  const jorney_path = path.join(
    __dirname,
    "..",
    `uploads/${req.body.jorney_id}`
  );
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  file.name = Date.now();

  if (req.body.fileType === "banner") {
    const old_banner_name = fs.readdirSync(
      `${jorney_path}/banner/`,
      (err, files) => {
        return files;
      }
    );

    if (old_banner_name.length !== 0) {
      fs.unlink(`${jorney_path}/banner/${old_banner_name}`, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    }
  }

  switch (req.body.fileType) {
    case "banner":
      dir = `${jorney_path}/banner/${file.name}`;
      break;
    case "photo":
      dir = `${jorney_path}/photos/${file.name}`;
      break;
    default:
      console.log("Sorry, we are out of " + fileType + ".");
  }

  file.mv(dir, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: dir });
  });
};

exports.jorneys_get = (req, res) => {
  jorney_model
    .getJorneys()
    .then((response) => {
      const new_resp = response.map((item, i) => {
        let jorney = add_images_to_jorney(item);
        if (jorney) {
          return add_images_to_jorney(item);
        } else return false;
      });
      let new_resp_2 = new_resp.filter(function (x) {
        if (x) return x;
      });
      res.status(200).send(new_resp_2);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

exports.jorney_get = (req, res) => {
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
};

exports.jorney_post = (req, res) => {
  jorney_model
    .createJorney(req.body)
    .then((response) => {
      const dir = path.join(
        __dirname,
        "..",
        `uploads/${response.creation_date}`
      );
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
};

function deleteFolder(path) {
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
        console.log(error);
      }
    );
  } else if (files.length == 0) return "Everything is clean";
  return "Everything is clean";
}

exports.jorney_delete = (req, res) => {
  const jorney_path = path.join(__dirname, "..", `uploads/${req.params.id}`);
  jorney_model
    .deleteJorney(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });

  deleteFolder(jorney_path);
  // deleteFolder(path);
};

exports.jorney_photo_delete = (req, res) => {
  const path_to_photo = path.join(
    __dirname,
    "..",
    `uploads/${req.params.id}/photos/${req.params.photoId}`
  );
  try {
    fs.unlinkSync(path_to_photo);
  } catch (err) {
    console.error(err);
  }
};
