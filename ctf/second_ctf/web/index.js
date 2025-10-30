const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({ secret: "secret123", resave: false, saveUninitialized: true })
);
app.use(express.json());

const creds = { Administrator: "twinkle", noTeEstreses: "DesestresaTec", hacker: "rompedordemadrEs", pedrito: "123123" };

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));

app.post("/login", (req, res) => {
	const { pawnguard, redes } = req.body || {};
	if (creds[pawnguard] === redes) {
		req.session.user = pawnguard;

		if (pawnguard === "pedrito") {
			return res.redirect("/dashboard2");
		} else if (pawnguard === "Administrator") {
			return res.redirect("/admin");
		}
	}
	return res.send("Invalid username or password.\nFor correct passwords: Found. Redirecting to /dashboard2");
});

app.post("/validation", (req, res) => {
  const { flag } = req.body || {};

  if ( flag === "PWG{LINUXEROS}" ){
    return res.json({ result: 1, username: "hacker" });
  }else if ( flag === "PWG{linuxmover}" ){
    return res.json({ result: 2, username: "noTeEstreses" });
  }else if(flag === "PWG{HARD}"){
    return res.json({ result: 3, username: "Administrator" });
  }

	return res.send("Invalid flag");
});

app.get("/dashboard2", (req, res) => {
	if (req.session.user === "pedrito") {
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

app.listen(80, "0.0.0.0", () => console.log("listening on 80 => you need to expose 80 docker port to 4344. Other option is modify /dasboard2.html to request port 80."));
