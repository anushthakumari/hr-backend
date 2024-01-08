const jwt = require("../libs/jwt.lib");
const { User } = require("../models"); // Update the path as needed

const authenticateUser = async (req, res, next) => {
	const authorizationHeader = req.header("Authorization");

	if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Unauthorized - No valid Bearer token provided" });
	}

	const token = authorizationHeader.split(" ")[1];

	try {
		const decoded = jwt.verifyToken(token); // Replace 'your-secret-key' with your actual secret key

		// Check if the user exists in the database
		const user = await User.findByPk(decoded.userId);

		if (!user) {
			return res.status(401).json({ error: "Unauthorized - Invalid token" });
		}

		// Attach the user to the request object for later use
		req.user = user;

		next();
	} catch (error) {
		console.error("Error verifying token:", error);
		return res.status(401).json({ error: "Unauthorized - Invalid token" });
	}
};

module.exports = authenticateUser;
