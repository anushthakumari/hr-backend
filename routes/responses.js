const express = require("express");

const userAnswerController = require("../controllers/userAnswers.controller");

const router = express.Router();

router.route("/").post(userAnswerController.saveQuizResponse);

module.exports = router;
