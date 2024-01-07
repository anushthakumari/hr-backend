module.exports = (sequelize, DataTypes) => {
	const Option = sequelize.define("Option", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isCorrect: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	});

	Option.associate = (models) => {
		Option.belongsTo(models.Question, {
			foreignKey: {
				name: "questionId",
				allowNull: false,
			},
		});
	};

	return Option;
};
