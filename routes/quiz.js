const express = require("express");

const quesController = require("../controllers/questions.controller");
const quizController = require("../controllers/quize.controller");

const router = express.Router();

router.route("/").get(quizController.getAllQuizzes);
router.route("/:quizId/questions").get(quesController.getQuizQuestions);

module.exports = router;
