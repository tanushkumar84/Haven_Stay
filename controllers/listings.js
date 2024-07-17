const Listing = require("../models/listing");

// Index - Show all listings
module.exports.index = async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show - Show a specific listing
module.exports.showListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: {
        path: "author",
      }
    }).populate("owner");

    if (!listing) {
      req.flash("error", "Listing no longer exists!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Create - Create a new listing
module.exports.createListing = async (req, res, next) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload an image.");
      return res.redirect("/listings/new");
    }

    const url = req.file.path;
    const filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Edit - Render edit form for a listing
module.exports.editListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing no longer exists!");
      return res.redirect("/listings");
    }
    let originalImg=listing.image.url.replace("/upload","/upload/w_250");
    // originalImg=originalImg.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing,originalImg});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update - Update a specific listing
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Destroy - Delete a specific listing
module.exports.destroyListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);

    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
