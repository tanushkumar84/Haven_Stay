const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); // Corrected path
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js")


//index route
router.get("/", wrapAsync(listingController.index));

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW ROUTE
router.get("/:id", wrapAsync(listingController.showListing));

//CREATE ROUTE
router.post("/", wrapAsync(listingController. createListing));

//Edit ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;