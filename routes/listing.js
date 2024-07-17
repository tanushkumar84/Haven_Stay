const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); // Corrected path
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage}=require("../cloudConfig.js");
const uplaod = multer({storage});

//index and create route 
router.
    route("/")
    .get(wrapAsync(listingController.index))
    // .post( wrapAsync(listingController. createListing));

    .post(uplaod.single('listing[image]'), (req, res) => {
        res.send(req.file);
    })
//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);


//show, update and delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;