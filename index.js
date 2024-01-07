const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const models = require("./models");
const apiRoutes = require("./routes");

const app = express();

const createRecordingsFolder = () => {
	const folderPath = "./recordings";
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
		console.log("Recordings folder created.");
	}
};
createRecordingsFolder();

app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.raw({ type: "video/webm", limit: "10mb" }));

app.use("/api/v1", apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
