const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price : Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    Image: Joi.string().allow("",null),
      category: Joi.array().items(Joi.string()).required()

});

module.exports.reviewSchema = Joi.object({
  Reviews: Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().required()
  })
});

module.exports.updateListingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  Image: Joi.string().allow("", null),
  location: Joi.string().required(),
  country: Joi.string().required(),
  category: Joi.array().items(Joi.string()),

});