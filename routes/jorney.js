const express = require("express");
const router = express.Router();

const jorney_controller = require("../controllers/jorneyController");

router.get("/getjorneys", jorney_controller.jorneys_get);
router.get("/getjorney/:id", jorney_controller.jorney_get);
router.post("/addnewjorney", jorney_controller.jorney_post);
router.delete("/jorney/:id", jorney_controller.jorney_delete);
router.delete(
  "/jorney/deletephoto/:id/:photoId",
  jorney_controller.jorney_photo_delete
);
router.post("/upload", jorney_controller.jorney_upload);

module.exports = router;
