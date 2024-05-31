const bcrypt = require("bcrypt")
const validator = require("validator")
const User = require('../models/user')

const userTest = async (req, res) => {
  res.send({ body: "User request received." });
};

const signUp = async(req,res) => {
  try {
    const {email, password, username,aboutMe} = req.body;
    if(!email) {
    return res.status(400).json({message: "Email Required!"})
    }
    if(!password) {
      res.status(400).json({message:"Password is required!"})
    }
    if(!username) {
      res.status(400).json({message:"Username is required!"})
    }
    if(!validator.isEmail(email)) {
      return res.status(400).json({message: "Not a valid email format."})
    }
    const userExist = await User.findOne({email});
    if(userExist) {
      return res.status(400).json({message: "This email has already been used."})
    }
    const hashPassword = await bcrypt.hash(password,10)
    await User.create({email,password: hashPassword,username,aboutMe})
    return res.status(201).json({message: "User created"})
  }catch(error) {
    console.log("Internal Server Error:", error)
    res.status(500).json({message:"Internal Server Error."})
  }
};

module.exports = {signUp, userTest}; 