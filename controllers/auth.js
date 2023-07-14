const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {SECRET_KEY} = process.env

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user !== null) {
    return res.status(409).json({ "message": "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });
  return res.json({ message: 'User created' });
}


const login = async (req, res) => {
const {email, password} = req.body

if (!email || !password) {
  throw new HttpError(400, "Email and password are required");
}

const user = await User.findOne({email})
if(!user){
  throw new HttpError(401, "Email or password is wrong")
}
const passwordCompare = await bcrypt.compare(password, user.password)
if(!passwordCompare){
  throw new HttpError(401, "Email or password is wrong")
}

const payload = {
  id: user._id,
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "7d"})

res.json({token})
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};






