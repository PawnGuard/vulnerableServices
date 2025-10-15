const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const creds = { admin: "password123", john: "qwerty" };

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {
	const { username, password } = req.body || {};
	if (creds[username] === password) {
		return res.redirect("/dashboard");
	}
	return res.send("Invalid username or password");
});

app.get("/dashboard", (req, res) => res.send("Flag: CTF{example-flag-123}"));

app.listen(8080, "0.0.0.0", () => console.log("listening on 8080"));
