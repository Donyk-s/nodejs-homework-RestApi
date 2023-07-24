const express = require('express');
const {validateBody, authenticate} = require('../../midlewares');
const {validateUserSchema} = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post("/register", validateBody(validateUserSchema.registerSchema), ctrl.register);
router.post("/login", validateBody(validateUserSchema.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout)
module.exports = router;


