const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const Quiz = sequelize.define("Quiz", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	});

	Quiz.associate = (models) => {
		Quiz.hasMany(models.Question, { foreignKey: "quizId" });
	};

	return Quiz;
};
