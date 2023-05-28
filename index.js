const express = require("express");
const app = express();

app.use(express.static("public"));

//index.js
app.get("/", (req, res) => {
	res.send("Caps parser is working!");
});

app.listen(process.env.PORT || 3000);
// index.js
module.exports = app;
