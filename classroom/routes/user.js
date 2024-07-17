const express = require("express");
const router = express.Router();

// Post route

// Index - users
router.get("/", (req, res) => { 
    res.send("Hello Users");
});

// Show route
router.get("/:id", (req, res) => {
    res.send("get show User");
});

// Post - route
router.post("/", (req, res) => {
    res.send("post User");
});

// Delete route
router.delete("/:id", (req, res) => {
    res.send("delete User");
});


module.exports=router;