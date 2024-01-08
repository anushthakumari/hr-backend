const jwt = require("jsonwebtoken");

module.exports.generateToken = (userId) => {
	const token = jwt.sign({ userId }, "your-secret-key", {
		expiresIn: "6h",
	});

	return token;
};

module.exports.verifyToken = (token) => {
	return jwt.verify(token, "your-secret-key");
};
