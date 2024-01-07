const express = require("express");

const responseRouter = require("./responses");
const quizRouter = require("./quiz");
const recRouter = require("./recordings");

const routes = express.Router();

routes.use("/responses", responseRouter);
routes.use("/quiz", quizRouter);
routes.use("/recordings", recRouter);

module.exports = routes;
