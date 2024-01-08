"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("UserAnswers", "quizId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Quizzes",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("UserAnswers", "quizId");
	},
};
