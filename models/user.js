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
  token: String,
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





// const { Schema, model } = require("mongoose");
// const { handelMongooseError } = require("../helpers");
// const Joi = require("joi");

// const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// // const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;


// // console.log(validPassword.test("Password123")); // повинно бути true

// const userSchema = new Schema({
//   password: {
//     type: String,
//     required: [true, "Set password for user"],
//     // validate: {
//     //   // validator: (value) => validPassword.test(value),
//     //   message: (props) => "Password must contain at least 6 characters",
//     // },
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     validate: {
//       validator: (value) => validEmail.test(value),
//       message: (props) => `${props.value} is not a valid email address`,
//     },
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter",
//   },
//   token: String,
// },
// { versionKey: false, timestamps: true });

// userSchema.post("save", handelMongooseError);

// const registerSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().pattern(validEmail).required(),
//   password: Joi.string().min(6).required(),
// });


// // const registerSchema = Joi.object({
// //   name: Joi.string().required(),
// //   email: Joi.string().pattern(validEmail).required(),
// //   password: Joi.string()
// //     .pattern(validPassword)
// //     .messages({
// //       "string.pattern.base": "The password must contain at least 6 characters. Capital letters and numbers.",
// //     })
// //     .required(),
// // });

// // const loginSchema = Joi.object({
// //   email: Joi.string().pattern(validEmail).required(),
// //   password: Joi.string()
// //     .pattern(validPassword)
// //     .messages({
// //       "string.pattern.base": "The password must contain at least 6 characters. Capital letters and numbers.",
// //     })
// //     .required(),
// // });


// const validateUserSchema = {
//   registerSchema,
//   // loginSchema
// }

// const User = model("User", userSchema)

// module.exports = {
//   User,
//   validateUserSchema, 
// }

