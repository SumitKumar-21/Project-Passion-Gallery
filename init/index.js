const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");  //importing 
const mongoUrl ="mongodb://127.0.0.1:27017/pg";
main()
.then(()=>{
console.log("Connection build successful");
}
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}


const initDB = async()=>{
  await Listing.deleteMany({});
data.data = data.data.map((item)=>{
  return {...item, owner: "6a30fde23fe34a4bf5409112"}
});
  await Listing.insertMany(data.data);
  console.log("data was initalized")
};

initDB();
