module.exports = (sequelize, DataTypes) => {
	const UserRecording = sequelize.define("UserRecording", {
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
		videoUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	UserRecording.associate = (models) => {
		UserRecording.belongsTo(models.User, { foreignKey: "userId" });
		UserRecording.belongsTo(models.Quiz, { foreignKey: "quizId" });
	};

	return UserRecording;
};
