const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({ secret: "secret123", resave: false, saveUninitialized: true })
);
app.use(express.json());

const creds = { Administrator: "twinkle", john: "1122112233", guest: "123456" };

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

app.post("/login", (req, res) => {
	const { username, password } = req.body || {};
	if (creds[username] === password) {
		req.session.user = username;

		if (username === "john" || username === "guest") {
			return res.redirect("/dashboard");
		} else if (username === "Administrator") {
			return res.redirect("/admin");
		}
	}
	return res.send("Invalid username or password");
});

app.post("/validation", (req, res) => {
  const { flag } = req.body || {};

  if ( flag === "PWG{MY_FIRST_TRY}" ){
    return res.json({ result: 1, username: "bruteforce", silence: "firee" });
  }else if ( flag === "PWG{IM_HACKING}" ){
    return res.json({ result: 2 });
  }else {
    return res.json({ result: 0 });
  }

	return res.send("Invalid flag");
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

app.listen(80, "0.0.0.0", () => console.log("listening on 80"));
