const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.error(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {});
}


const initDB = async () => {

  initData.data = initData.data.map((obj) => ({ ...obj, owner: "6696a078e7785295670d50f6" }))
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");

}
initDB();