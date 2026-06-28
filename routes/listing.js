const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin,verifyOwner,validateSchema,validateUpdateSchema} =require("../middleware/middlewares.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer')
const {storage} =require("../cloudConfig.js");
const upload = multer({ storage });




//show all page 
router.get("/",wrapAsync(listingController.showAll ));;

//logout
router.get("/logout",listingController.logout);
router.get("/btn",wrapAsync(listingController.showAll ));

//creating new
router
.route("/new")
.get(isLoggedin ,listingController.renderNewForm)
.post(upload.single('listing[Image]'),validateSchema, wrapAsync(listingController.saveNewFormDate));


router
.route("/:id")
.get(wrapAsync(listingController.showIndividually ))
.put(isLoggedin,verifyOwner, upload.single('listing[Image]'),validateUpdateSchema,wrapAsync(listingController.updateEdit ))
.delete(isLoggedin,verifyOwner,wrapAsync(listingController.destroy ));

//edit
router.get("/:id/edit", isLoggedin,verifyOwner,wrapAsync(listingController.renderEditForm ));


module.exports= router;
