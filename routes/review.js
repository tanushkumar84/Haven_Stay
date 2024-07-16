const express =require ("express");
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); // Corrected path
const { validateReview, isLoggedIn ,isReviewAuthor} = require("../middleware.js");



  router.post("/",isLoggedIn, validateReview,wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Thanks  for  your  Review!");
    res.redirect(`/listings/${listing._id}`);
  }));
  
  
  
  //delete review route
  router.delete(
    "/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
      let{id,reviewId}=req.params;
      await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
      await Review.findByIdAndDelete(reviewId);
      req.flash("success","Review Deleted !");
      res.redirect(`/listings/${id}`);
    }));
  
    module.exports=router;