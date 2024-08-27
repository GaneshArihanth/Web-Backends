const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const port = 3002;

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "b.g.arihanth@gmail.com",
    password: "123456",
    name: "Ganesh",
  },
  {
    username: "balajismart@gmail.com",
    password: "123321",
    name: "Balaji",
  },
  {
    username: "stark@gmail.com",
    password: "123321",
    name: "Boopendranath",
  },
];

function userExists(username) {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username == username) {
      return true;
    }
  }
  return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory database",
    });
  }

  var token = jwt.sign({ username: username }, password);
  return res.json({
    token
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const loginname = decoded.username;
    res.json({
      msg: "Welcome to the users page",
      loginname
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid user not found"
    });
  }
});

app.listen(port)

