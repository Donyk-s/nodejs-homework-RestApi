const express = require('express');
const {validateBody} = require('../../midlewares')
const {validateUserSchema} = require('../../models/user')
const ctrl = require('../../controllers/auth')

const router = express.Router()

router.post("/register", validateBody(validateUserSchema.registerSchema), ctrl.register)
router.post("/login", validateBody(validateUserSchema.loginSchema), ctrl.login)
module.exports = router;

