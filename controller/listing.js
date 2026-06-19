const Listing =  require("../models/listing.js");
const mapUrl ="https://api.mapbox.com/search/geocode/v6/forward?q="


//showall
module.exports.showAll=async(req,res)=>{
const list= await Listing.find({});
 res.render("list/showall.ejs",{list});
};
//logout
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        console.log(req.user);
       if(err) next(err);
       else{
        req.flash("success","You successfully logged out");
        res.redirect("/showall");
       }
    })
}

//New form
module.exports.renderNewForm=(req,res)=>{
    res.render("list/newForm.ejs");
};
module.exports.saveNewFormDate=async(req,res,next)=>{
   let info =new Listing(req.body.listing);
   let url = req.file.path;
   let filename = req.file.filename;
   info.owner = req.user._id;
   info.Image={url,filename};
let response =await fetch(`${mapUrl}${info.location},${info.country}&limit=1&access_token=${process.env.MAPBOX_API_TOKEN}`);
let result = await response.json();
info.geometry=result.features[0].geometry
await info.save();
  req.flash("success","New Item added");
  console.log("Info added to database");
  res.redirect("/showall");
};

//show individual
module.exports.showIndividually=async(req,res)=>{
    let {id}= req.params;
    let data= await Listing.findById(id).populate({
        path: "reviews" , populate:{
            path:"owner",
        }
    }).populate("owner");
    if(!data){
        req.flash("error","List won't exists");
    }else{
            res.render("list/showIndividual.ejs",{data,mapToken:process.env.MAPBOX_API_TOKEN});
    }
};

//Edit form
module.exports.renderEditForm=async(req,res)=>{
    let{id}= req.params;
      let info=await Listing.findById(id);
    res.render("list/editForm.ejs",{info});
};
module.exports.updateEdit=async(req,res)=>{
    let{id}=req.params;
    let updatedData= await Listing.findByIdAndUpdate(id,{...req.body.listing});
       if( typeof req.file !== "undefined"){
    let url = req.file.path;
   let filename = req.file.filename;
   updatedData.Image={url,filename};
   await updatedData.save();
    }

req.flash("success","Change updated");
res.redirect(`/showall/${id}`);
};

//delete
module.exports.destroy=async(req,res)=>{
    let{id}= req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success","Item was deleted ");
    res.redirect("/showall");
};
