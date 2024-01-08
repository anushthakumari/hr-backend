const express = require("express");

const responseRouter = require("./responses");
const quizRouter = require("./quiz");
const recRouter = require("./recordings");
const userRouter = require("./user");

const authenticateUser = require("../middlewares/authenticateUser");

const routes = express.Router();

routes.use("/responses", authenticateUser, responseRouter);
routes.use("/quiz", authenticateUser, quizRouter);
routes.use("/recordings", authenticateUser, recRouter);
routes.use("/user", userRouter);

module.exports = routes;
