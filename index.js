const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.post("/getCapabilities", async (req, res) => {
	const data = req.body;
	if (data.url != null) {
		axios
			.get(`${data.url}?SERVICE=WMS&REQUEST=GetCapabilities`)
			.then((response) => {
				res.send(
					JSON.stringify({
						xml: response.data,
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		res.send(
			JSON.stringify({
				type: "error",
				message: "You should send url",
			})
		);
	}
});

app.listen(process.env.PORT || 3000);

module.exports = app;
