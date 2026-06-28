if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path= require("path");
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStartegy = require("passport-local");
const User = require("./models/user.js");
const ExpressError =  require("./utils/ExpressError.js");
const mongoUrl =process.env.MONGODB;
const {MongoStore} = require('connect-mongo');
//session stroing it into  mongodb  cloud server  
const store = MongoStore.create({
    mongoUrl:mongoUrl,
    crypto:{
        secret:process.env.SECRETCODE,
    },
    touchAfter:24*3600
});

const method ={
    store,
    secret:process.env.SECRETCODE,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
    }
}

app.use(session(method));
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//method override
const methodOverride= require("method-override");
app.use(methodOverride("_method"));

//ejs mate 
const ejsmate = require("ejs-mate");
app.engine("ejs",ejsmate );

app.use((req,res,next)=>{
    res.locals.user = req.user;
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    next();
});

const listing = require("./routes/listing.js");
app.use("/showall",listing);

const reviews = require("./routes/review.js");
app.use("/showall/:id/reviews",reviews);

const users = require("./routes/user.js");
app.use("/",users);


//home page
app.get("/", (req, res) => {
  res.redirect("/showall");
});

//Error handling 
app.use((req,res,next)=>{
    next(new ExpressError("Page not Found",404));
});

app.use((err,req,res,next)=>{
    let{status=500,message="Default Error"}= err;
    res.status(status).render("error.ejs",{message});
});

// starting server()
const port = 8080;

async function startServer() {
    try {
        await mongoose.connect(mongoUrl);
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
        app.listen(port, () => {
            console.log(`site is active Now on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
}
startServer();

