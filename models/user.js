const { Schema, model } = require("mongoose");
const { handelMongooseError } = require("../helpers");
const Joi = require("joi");

const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => validEmail.test(value),
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
avatar: {
  type: String,
  required: true,
}
},
{ versionKey: false, timestamps: true });

userSchema.post("save", handelMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(validEmail).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(validEmail).required(),
 password: Joi.string().min(6).required(),
});


const validateUserSchema = {
  registerSchema,
  loginSchema
}

const User = model("User", userSchema)

module.exports = {
  User,
  validateUserSchema, 
}