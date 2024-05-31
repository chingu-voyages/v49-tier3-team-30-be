const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");

const { sign } = require('jsonwebtoken');

const userTest = async (req, res) => {
  res.send({ body: "User request received." });
};

const signUp = async (req, res) => {
  try {
    const { email, password, username, aboutMe } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email Required!" });
    }
    if (!password) {
      res.status(400).json({ message: "Password is required!" });
    }
    if (!username) {
      res.status(400).json({ message: "Username is required!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Not a valid email format." });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "This email has already been used." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userReg = await User.create({
      email,
      password: hashPassword,
      username,
      aboutMe,
    });

    console.log("userRegggggggggggg", userReg);

    const accessToken = sign(
      { username: userReg.username, id: userReg.id },
      process.env.SECRET_KEY
    );
    //create a cookie in a browser:

    res.cookie("access-tokenn", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({ message: "User created",  token: accessToken, username: userReg.username, id: userReg.id});

  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { signUp, userTest };
