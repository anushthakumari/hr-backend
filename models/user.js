const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	});

	User.associate = (models) => {
		User.hasMany(models.UserAnswer, { foreignKey: "userId" });
	};

	User.beforeCreate((user, options) => {
		// Set the createdAt field to the current timestamp
		user.createdAt = new Date();
	});

	return User;
};
