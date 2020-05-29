const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const todos = require("./db/db.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API.",
  });
});

app.get("/dashboard", (req, res) => {
  res.json({
    todos: todos,
  });
});

app.post("/register", async (req, res) => {
  try {
    if (req.body) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const data = await JSON.stringify(user, null, 2);
      var dbUserEmail = require("./db/user.json").email;

      if (dbUserEmail === req.body.email) {
        res.sendStatus(400);
      } else {
        fs.writeFile("./db/user.json", data, (err) => {
          if (err) {
            console.log(err + data);
          } else {
            const token = jwt.sign(
              {
                user,
              },
              "the_secret_key"
            );
            res.json({
              token,
              email: user.email,
              name: user.name,
            });
          }
        });
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const userDB = await fs.readFileSync("./db/user.json");
    const userInfo = await JSON.parse(userDB);
    if (
      req.body &&
      req.body.email === userInfo.email &&
      req.body.password === userInfo.password
    ) {
      const token = jwt.sign(
        {
          userInfo,
        },
        "the_secret_key"
      );
      res.json({
        token,
        email: userInfo.email,
        name: userInfo.name,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// // MIDDLEWARE
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// }

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
