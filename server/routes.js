var express = require("express");
var router = express.Router();

router.get("/1", (req, res) => {
  res.json("hello world");
});

module.exports = router;
