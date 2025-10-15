const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({ secret: "secret123", resave: false, saveUninitialized: true })
);

const creds = { Administrator: "twinkle", john: "1122112233" };

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

app.post("/login", (req, res) => {
	const { username, password } = req.body || {};
	if (creds[username] === password) {
		req.session.user = username;

		if (username === "john") {
			return res.redirect("/dashboard");
		} else if (username === "Administrator") {
			return res.redirect("/admin");
		}
	}
	return res.send("Invalid username or password");
});

app.get("/dashboard", (req, res) => {
	if (req.session.user === "john") {
		return res.sendFile(__dirname + "/dashboard.html");
	}
	return res.status(403).send("Forbidden");
});

app.get("/admin", (req, res) => {
	if (req.session.user === "Administrator") {
		return res.send("<h1>Welcome, Admin</h1>");
	}
	return res.status(403).send("Forbidden");
});

app.listen(8080, "0.0.0.0", () => console.log("listening on 8080"));
