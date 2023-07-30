const express = require('express');
const {validateBody, authenticate} = require('../../midlewares');
const {validateUserSchema} = require('../../models/user');
const ctrl = require('../../controllers/auth');
const  upload  = require('../../midlewares/upload');

const router = express.Router();

router.post("/register", validateBody(validateUserSchema.registerSchema), ctrl.register);
router.get("/verify/:token", ctrl.verify); 
router.get("/verify/:token", validateBody(validateUserSchema.emailShema), ctrl.resendVerifyEmail);
router.post("/login", validateBody(validateUserSchema.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout)
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);
module.exports = router;

