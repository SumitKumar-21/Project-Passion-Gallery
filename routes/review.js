const express =require("express");
const route = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, CheckReviewOwner,isLoggedin, SaveredirectUrl} = require("../middleware/middlewares.js");
const reviewsController = require("../controller/reviews.js");

//updating section 
route.post("/",isLoggedin,SaveredirectUrl,validateReview, wrapAsync(reviewsController.postReviews ));

//deleting reviews
route.delete("/:reviewsid",isLoggedin,CheckReviewOwner ,wrapAsync(reviewsController.deleteReviews));

module.exports = route;
