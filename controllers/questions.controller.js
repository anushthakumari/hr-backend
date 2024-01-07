const models = require("../models");

async function getQuizQuestions(req, res) {
	const quizId = req.params.quizId;

	try {
		const quiz = await models.Quiz.findByPk(quizId, {
			include: {
				model: models.Question,
				include: {
					model: models.Option,
					attributes: ["id", "text"],
				},
			},
		});

		if (!quiz) {
			return null; // Quiz not found
		}

		const formattedQuestions = quiz.Questions.map((question) => {
			return {
				id: question.id,
				question: question.text,
				options: question.Options,
			};
		});

		res.send(formattedQuestions);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	getQuizQuestions,
};
