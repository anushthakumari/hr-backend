const models = require("../models");

async function getAllQuizzes(req, res) {
	try {
		const quizzes = await models.Quiz.findAll({
			attributes: ["id", "title"],
		});

		const formattedQuizzes = quizzes.map((quiz) => ({
			id: quiz.id,
			title: quiz.title,
		}));

		return res.json(formattedQuizzes);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	getAllQuizzes,
};
