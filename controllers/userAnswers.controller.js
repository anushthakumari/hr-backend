const models = require("../models");

const saveQuizResponse = async (req, res) => {
	try {
		const { questionId, selectedOptionId, quizId } = req.body;

		const userId = req.user.id;

		const user = await models.User.findByPk(userId);
		const question = await models.Question.findByPk(questionId);

		if (!user || !question) {
			return res.status(404).json({ error: "User or question not found" });
		}

		const response_id = await models.UserAnswer.findOne({
			where: {
				questionId,
				userId,
			},
		});

		await models.UserQuizStatus.update(
			{ lastAttemptedQuestionId: questionId },
			{
				where: {
					userId,
					quizId,
				},
			}
		);

		if (response_id) {
			const d = await models.UserAnswer.update(
				{ selectedOptionId },
				{
					where: {
						id: response_id,
					},
				}
			);

			res.status(201).json(d);

			return;
		}

		// Save the quiz response
		const userAnswer = await models.UserAnswer.create({
			userId,
			questionId,
			selectedOptionId,
		});

		res.status(201).json(userAnswer);
	} catch (error) {
		console.error("Error saving quiz response:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const insertQuizData = async () => {
	try {
		// Create a quiz
		// const createdQuiz = await models.Quiz.create({ title: "Your Quiz Title" }); // Set a title for your quiz

		// for (const { id, question, options, answer } of jsonData) {
		// 	console.log(createdQuiz.dataValues);

		// 	// Insert question
		// 	const createdQuestion = await models.Question.create({
		// 		text: question,
		// 		quizId: createdQuiz.dataValues.id,
		// 	});

		// 	// Insert options with isCorrect
		// 	const createdOptions = await Promise.all(
		// 		options.map((text, index) => {
		// 			return models.Option.create({
		// 				text,
		// 				isCorrect: index === options.indexOf(answer), // Set isCorrect based on the answer index
		// 				questionId: createdQuestion.id,
		// 			});
		// 		})
		// 	);

		// 	// // Find the correct option based on isCorrect
		// 	// const correctOption = createdOptions.find((option) => option.isCorrect);

		// 	// // Insert answer
		// 	// await models.Answer.create({
		// 	// 	questionId: createdQuestion.id,
		// 	// 	correctOptionId: correctOption ? correctOption.id : null,
		// 	// });
		// }

		console.log("Quiz data inserted successfully");
	} catch (error) {
		console.error("Error inserting quiz data:", error);
	} finally {
		// Close the database connection if needed
		// await models.sequelize.close();
	}
};

module.exports = {
	saveQuizResponse,
	insertQuizData,
};
