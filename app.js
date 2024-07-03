const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Corrected path
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//index route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//NEW ROUTE
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//SHOW ROUTE
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//CREATE ROUTE
app.post("/listings", wrapAsync(async (req, res, next) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing")
  }
  const newListing = new Listing(req.body.listing);
  if (!newListing.title) {

    throw new ExpressError(400, "title is missing ")

  }
  if (!newListing.description) {

    throw new ExpressError(400, "description is missing ")

  }
  if (!newListing.location) {

    throw new ExpressError(400, "location is missing ")

  }
  await newListing.save();
  res.redirect("/listings");
}));

//Edit ROUTE
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//       title: "Test Listing",
//       description: "This is a test listing",
//       price: 1000,
//       location: "GHAZIABAD ,U.P",
//       country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample listing was saved");
//     res.send("Listing saved successfully");

// });
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
})
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong ! " } = err;
  res.status(statusCode).render("error.ejs", { message })
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
