const fs = require("fs");

const models = require("../models");

async function saveRecording(req, res) {
	try {
		const { quizId } = req.body; // Extract user ID and quiz ID from request body

		const userId = req.user.id;

		console.log(req.body);

		// Save the recording to the file system
		const filePath = `recordings/${userId}_${quizId}_recording.webm`;
		// const fileStream = fs.createWriteStream(filePath);

		// Pipe the request stream into the file stream
		// req.pipe(fileStream);

		// fileStream.on("finish", async () => {
		// 	console.log("Recording saved to file system:", filePath);

		// 	// Save the recording information to the database
		// 	const recording = await models.UserRecording.create({
		// 		userId,
		// 		quizId,
		// 		videoUrl: filePath, // Assuming you want to store the file path as the video URL
		// 	});

		// 	console.log("Recording saved to database:", recording);

		// 	res.sendStatus(200);
		// });

		// fileStream.on("error", (err) => {
		// 	console.error("Error saving recording:", err);
		// 	res.sendStatus(500);
		// });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	saveRecording,
};
