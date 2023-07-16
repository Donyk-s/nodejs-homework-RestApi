const handelMongooseError = (error, data, next) => {
  const {name, code} = error;
  const status = (name === 'handelMongooseError' && code === 11000) ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handelMongooseError;
