const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserbyUsername } = require("../database/users.js");
const { checkUserData, checkUser } = require("./utils.js");

const authRouter = express.Router();

authRouter.post("/register", checkUserData, checkUser, async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashPass = await bcrypt.hash(
      password,
      parseInt(process.env.SALT) || 7
    );

    const user = await createUser({ username, password: hashPass });
 
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT || "super secret super safe"
    );

    res.status(201).send({ token });
  } catch (error) {
    console.log(error);

    res.status(500).send({ error, message: "Could not register user" });
  }
});

authRouter.post("/login", async(req, res) => {
    try{
        const user = await findUserbyUsername(req.body.username);

        const isSamePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!user || !isSamePassword) {
            return res.status(401).send("Invalid login credentials");
        };

        const token = jwt.sign(
            {id: user.user_id},
            process.env.JWT || "super secret"
        );

        res.send({token});
    } catch (error) {
        console.log(error);
        res.status(500).send({error, message: "Could not login user"});
    }
});

module.exports = authRouter;