const Reviews = require("../models/reviews.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

module.exports.postReviews=async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        throw new ExpressError("Listing not found",404);
    }
    const review1 =  new Reviews(req.body.Reviews);
    review1.owner= req.user._id;
    console.log(review1);
    await review1.save();
    listing.reviews.push(review1);
    await listing.save();
    console.log("Reviews Added successfully");
      req.flash("success","Review added");
    res.redirect(`/showall/${id}`);
};

module.exports.deleteReviews=async(req,res)=>{
    let {id, reviewsid} = req.params;
    await Reviews.findByIdAndDelete(reviewsid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewsid}});
    console.log("deleted successfully");
      req.flash("success","Review deleted ");
    res.redirect(`/showall/${id}`);
};