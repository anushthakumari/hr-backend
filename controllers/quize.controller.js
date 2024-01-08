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

async function startQuiz(req, res) {
	try {
		const { quizId } = req.body;

		const userId = req.user.id;

		// Check if the quiz has already been started
		const existingStatus = await models.UserQuizStatus.findOne({
			where: { userId, quizId },
		});

		if (existingStatus) {
			return res
				.status(200)
				.json({ message: "Quiz has already been started." });
		}

		// Create a new quiz status for the user
		const quizStatus = await models.UserQuizStatus.create({
			userId,
			quizId,
		});

		return res
			.status(200)
			.json({ message: "Quiz started successfully.", quizStatus });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error." });
	}
}

const endQuiz = async (req, res) => {
	try {
		const { quizId } = req.body;
		const userId = req.user.id;

		// Find the user's quiz status
		const userQuizStatus = await models.UserQuizStatus.findOne({
			where: { userId, quizId },
			include: {
				model: models.Quiz,
				include: {
					model: models.Question,
					include: models.Option,
				},
			},
		});

		if (!userQuizStatus) {
			return res.status(404).json({ error: "User quiz status not found" });
		}

		// Retrieve all user answers for the quiz
		const userAnswers = await models.UserAnswer.findAll({
			where: { userId, quizId },
			include: [{ model: models.Question, include: models.Option }],
		});

		// Calculate the score based on user responses
		let score = 0;
		userAnswers.forEach((userAnswer) => {
			const correctOptionId = userAnswer.Question.Options.find(
				(opt) => opt.isCorrect
			).id;
			if (userAnswer.selectedOptionId === correctOptionId) {
				score += 1;
			}
		});

		// Update the user's quiz status with the calculated score and set status to 1 (complete)
		const updatedUserQuizStatus = await userQuizStatus.update({
			status: 1,
			score,
			updatedAt: new Date(), // Update the updatedAt field
		});

		res.status(200).json(updatedUserQuizStatus);
	} catch (error) {
		console.error("Error ending quiz:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = endQuiz;

module.exports = endQuiz;

module.exports = {
	getAllQuizzes,
	startQuiz,
	endQuiz,
};
