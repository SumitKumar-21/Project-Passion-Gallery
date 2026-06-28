const User = require("../models/user.js");
const passport = require("passport");

//sign up
module.exports.renderSignupPage = (req, res) => {
  res.render("user/signup.ejs");
};
module.exports.saveSignupData = async (req, res) => {
    let { username, email, password } = req.body;
    let user1 = new User({
      username: username,
      email: email,
    });
    let userData = await User.register(user1, password);
    console.log(userData);
    req.login(userData, (err) => {
      if (err) next(err);
      req.flash("success", "Successfully signed up and Logged In");
      res.redirect("/showall");
    });
};

//login
module.exports.renderLoginPage = (req, res) => {
  res.render("user/login.ejs");
};
module.exports.passwordAuthenticate= passport.authenticate("local", {failureRedirect: "/login",failureFlash: true,
});

module.exports.renderAfterLogin = (req, res) => {
    req.flash("success", "Login Successful");
    let redirectUrl = res.locals.redirectUrl || "/showall";
    res.redirect(redirectUrl);
  };
