module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define("Question", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Question.associate = (models) => {
		Question.belongsTo(models.Quiz, { foreignKey: "quizId" });
		Question.hasMany(models.UserAnswer, { foreignKey: "questionId" });
		Question.hasMany(models.Option, {
			foreignKey: {
				name: "questionId",
				allowNull: false,
			},
		});
	};

	return Question;
};
