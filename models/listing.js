const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reviews = require("./reviews.js")
const User = require("./user.js");
const { string } = require("joi");

const listingSchema =new Schema({
title:{
    type:String,
    required:true
    
},
description: String,
Image: {
    url:String,
    filename:String,
    // default:"https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    // set:(v)=>  (v==="")? "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg":v,
}, 
price: Number,
location: String,
country: String,
reviews:[{
    type:Schema.Types.ObjectId,
    ref:'Reviews'
}],
owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
},
geometry: {
  type: {
    type: String,
    enum: ['Point'], 
    required: true
  },
  coordinates: {
    type: [Number],  
    required: true
  }
}

});

listingSchema.post('findOneAndDelete',async(listing)=>{
   let res= await Reviews.deleteMany({_id:{$in:listing.reviews}});
    console.log(res);
});

const Listing = mongoose.model("Listing",listingSchema);


module.exports= Listing;