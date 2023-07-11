const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user !== null) {
    return res.status(409).json({ "message": "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
  await User.create({ name, email, password: hashedPassword });
  return res.json({ message: 'User created' });
}

module.exports = {
  register: ctrlWrapper(register),
};






