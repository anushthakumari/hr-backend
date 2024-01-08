module.exports = (sequelize, DataTypes) => {
	const UserAnswer = sequelize.define(
		"UserAnswer",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			questionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			selectedOptionId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			uniqueKeys: {
				unique_user_question: {
					fields: ["userId", "questionId"],
				},
			},
		}
	);

	UserAnswer.associate = (models) => {
		UserAnswer.belongsTo(models.User, { foreignKey: "userId" });
		UserAnswer.belongsTo(models.Question, { foreignKey: "questionId" });
		UserAnswer.belongsTo(models.Quiz, { foreignKey: "quizId" });
		UserAnswer.belongsTo(models.Option, {
			as: "selectedOption",
			foreignKey: "selectedOptionId",
		});
	};

	return UserAnswer;
};
