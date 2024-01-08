const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const UserQuizStatus = sequelize.define(
		"UserQuizStatus",
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
			quizId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			lastAttemptedQuestionId: {
				type: DataTypes.INTEGER,
			},
			status: {
				type: DataTypes.TINYINT,
				defaultValue: 0,
				allowNull: false,
			},
			score: {
				type: DataTypes.INTEGER,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
				onUpdate: "CURRENT_TIMESTAMP",
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
				onUpdate: "CURRENT_TIMESTAMP",
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ["userId", "quizId"],
				},
			],
		}
	);

	UserQuizStatus.associate = (models) => {
		UserQuizStatus.belongsTo(models.User, { foreignKey: "userId" });
		UserQuizStatus.belongsTo(models.Quiz, { foreignKey: "quizId" });
	};

	return UserQuizStatus;
};
