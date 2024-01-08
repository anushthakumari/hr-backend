const bcrypt = require("bcrypt");

const models = require("../models");
const { generateToken } = require("../libs/jwt.lib");

async function register(req, res) {
	try {
		const { email, password, firstName, lastName } = req.body;

		// Check if the user already exists
		const existingUser = await models.User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Email is already in use" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		const newUser = await models.User.create({
			email,
			password: hashedPassword,
			firstName,
			lastName,
		});

		const { password: _, ...userWithoutPassword } = newUser.toJSON();

		return res.status(201).json(userWithoutPassword);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const user = await models.User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Compare passwords
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = generateToken(user.id);

		return res.status(200).json({
			token,
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

module.exports = {
	register,
	login,
};
