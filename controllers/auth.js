const bcrypt = require('bcrypt');
const gravatar = require("gravatar")
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const crypto = require ('node:crypto')
const { User } = require('../models/user');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');
const sendEmail = require('../helpers')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET_KEY } = process.env


const avatarDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ "message": "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomUUID
  const avatarURL = gravatar.url(email)

  await User.create({ name, email, password: hashedPassword, avatarURL, verifyToken });
  await sendEmail({
    to: email,
    subject: `Welcom on board, ${name}`,
    html: `To confirm your registration, please click on the link below: <a href = "http://localhost:3000/api/users/verify/${verifyToken}">Click me</a> `,
    text: `To confirm your registration, please open the link below: "http://localhost:3000/api/users/verify/${verifyToken}Click me`,
  })
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
await User.findByIdAndUpdate(user._id,{token})

res.json({token})
}

const getCurrent = async(req, res) =>{
  const {email, name} = req.user;
  res.json({email, name})
}

const logout = async (req, res) =>{
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.json({message: "Logout success"})

}


const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir, filename );
  await fs.rename(tempUpload, resultUpload);
  const avatarImage = await Jimp.read(resultUpload);
  avatarImage.resize(250, 250); 
  await avatarImage.writeAsync(resultUpload);
  const avatarURL = path.join("avatars", filename );
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  })

};


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};