
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema } = require("../schema.js");
const { listingSchema,updateListingSchema} = require("../schema.js");
const Review = require("../models/reviews.js");

module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; 
        req.flash("error", "You must be logged in to perform this task");
        return res.redirect("/login");
    }
    next();
};

module.exports.SaveredirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectUrl; 
    next();
};

module.exports.verifyOwner=async(req,res,next)=>{
    let {id}= req.params;
    let objectInfo = await Listing.findById(id);
    if(!objectInfo.owner._id.equals(req.user._id)){
       req.flash("error","You are not owner and. So, you don't have permission to make this change.");
       return res.redirect(`/showall/${id}`);
    }
    next();
};

module.exports.validateSchema=(req,res,next)=>{
    if(req.body.Image && req.body.listing){
        req.body.listing.Image = req.body.Image;
    }
    let {error}= listingSchema.validate(req.body.listing);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};
module.exports.validateUpdateSchema=(req,res,next)=>{
    if(req.body.Image && req.body.listing){
        req.body.listing.Image = req.body.Image;
    }
    let {error}= updateListingSchema.validate(req.body.listing);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};


module.exports.validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};

module.exports.CheckReviewOwner=async(req,res,next)=>{
    let {id,reviewsid} = req.params;
    let Currreview = await Review.findById(reviewsid);
    console.log(Currreview);
    if(! Currreview.owner._id.equals(req.user._id)){
        req.flash("error","Not allowed");
        return res.redirect(`/showall/${id}`);
    }
    next();
}