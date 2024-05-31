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
    await User.create({
      email,
      password: hashPassword,
      username,
      aboutMe,
    });
    
    return res.status(201).json({ message: "User created"});

  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const login = async(req, res) => {
  try {
    const { username, password} = req.body;
    const user = await User.findOne({username: username});
    if (!user) {
      return res.json({message: "User doesn't exist."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.json({message: "Username or Password is Incorrect"});
  }

    const accessToken = sign(
      { username: user.username, id: user.id },
      process.env.SECRET_KEY
    );
    //create a cookie in a browser:

    res.cookie("access-tokenn", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....
      secure: true,
      sameSite: "none",
    });

    console.log("accessToken", accessToken)
    //token: accessToken,
    return res.status(201).json({ message: "User loged in",   username: user.username, email: user.email, id: user.id, token: accessToken,});

  } catch (error) {
    console.log("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

module.exports = { signUp, userTest, login };
