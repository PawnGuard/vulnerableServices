const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({ secret: "secret123", resave: false, saveUninitialized: true })
);
app.use(express.json());

const creds = { Administrator: "twinkle", john: "1122112233", hernandez: "celeste" };

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

app.post("/login", (req, res) => {
	const { username, password } = req.body || {};
	if (creds[username] === password) {
		req.session.user = username;

		if (username === "john") {
			return res.redirect("/dashboard");
		} else if (username === "Administrator") {
			return res.redirect("/admin");
		}else if(username === "hernandez"){
      return res.redirect("/dashboard2");
    }
	}
	return res.send("Invalid username or password");
});

app.post("/validation", (req, res) => {
  const { flag } = req.body || {};

  if ( flag === "PWG{MY_FIRST_TRY}" ){
    return res.json({ result: 1, username: "pawnguard" });
  }else if ( flag === "PWG{IM_HACKING}" ){
    return res.json({ result: 2, username: "hacker" });
  }else if(flag === "PWG{I_AM_COOKING}"){
    return res.json({ result: 3, username: "¡FELICIDADES, YA NO HAY USUARIOS!" });
  }

	return res.send("Invalid flag");
});

app.get("/dashboard", (req, res) => {
	if (req.session.user === "john") {
		return res.sendFile(__dirname + "/dashboard.html");
	}
	return res.status(403).send("Forbidden");
});

app.get("/dashboard2", (req, res) => {
	if (req.session.user === "hernandez") {
		return res.sendFile(__dirname + "/dashboard2.html");
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
