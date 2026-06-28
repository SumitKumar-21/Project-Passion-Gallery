const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reviews = require("./reviews.js")
const User = require("./user.js");
const { string, required } = require("joi");

const listingSchema =new Schema({
title:{
    type:String,
    required:true
},
description: String,
Image: {
    url:String,
    filename:String,
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
},
category:{
  type:[String],
  required:true,
},

});

listingSchema.post('findOneAndDelete',async(listing)=>{
   let res= await Reviews.deleteMany({_id:{$in:listing.reviews}});
    console.log(res);
});

const Listing = mongoose.model("Listing",listingSchema);


module.exports= Listing;