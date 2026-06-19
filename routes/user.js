const express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { SaveredirectUrl } = require("../middleware/middlewares.js");
const userController= require("../controller/user.js");


//sign up
router
.route("/signup")
.get(userController.renderSignupPage)
.post(userController.saveSignupData);

//login 
router
.route("/login")
.get(userController.renderLoginPage)
.post(SaveredirectUrl,userController.passwordAuthenticate,userController.renderAfterLogin);


module.exports= router;
