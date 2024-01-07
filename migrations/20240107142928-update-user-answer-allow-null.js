"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("UserAnswers", "selectedOptionId", {
			type: Sequelize.INTEGER,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("UserAnswers", "selectedOptionId", {
			type: Sequelize.INTEGER,
			allowNull: false,
		});
	},
};
