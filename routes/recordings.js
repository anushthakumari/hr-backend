const express = require("express");
const bodyParser = require("body-parser");

const recController = require("../controllers/useRecording.controller");

const router = express.Router();

router.route("/").post(recController.saveRecording);
module.exports = router;
