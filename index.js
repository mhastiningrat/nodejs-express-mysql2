const express = require("express");
const router = require("./router");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

for (routes of router.routes) {
	app.use("/api", routes);
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
