const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const jwtPassword = "123456";

const port = 3005;

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://bgarihanth:Gan12345@cluster1.z7q6q.mongodb.net/all_users");

const allUsers = mongoose.model("allUsers" , {
  username: String,
  password: String
});
 

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userExists = await allUsers.findOne({ username: username });

    if (userExists) {
      return res.status(403).json({
        msg: "User exist in our in mongo database already (post / signup)",
      });
    }

    const user = new allUsers({
      username: username,
      password: password
    });
  
    await user.save();

    return(
      res.status(201).json({
        msg: "User created successfully in mongo database (post / signup)",
      })
    )

  }
  catch(err){
    console.error(`Error signing in: ${err} (post / signup)`);
    return res.status(500).json({
      msg: "Internal server error (post /signup)"
    })
  }    

});


app.put("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userExists = await allUsers.findOne({ username: username });

    if (!userExists) {
      return res.status(403).json({
        msg: "User doesnt exist in our in mongo database (put / signin)",
      });
    }
  
    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      msg: "User signed in successfully in mongo database (put / signin)",
      token
    });
  
  }
  catch(err){
    console.error(`Error signing in: ${err} (put / signin)`);
    return res.status(500).json({
      msg: "Internal server error (put / signin)"
    })
  }    

});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, password);
    const loginname = decoded.username;
    res.json({
      msg: "Welcome to the users page (get / users)",
      loginname
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid user not found (get / users)"
    });
  }
});

app.listen(port);

