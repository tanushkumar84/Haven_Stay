const express = require("express");
const router = express.Router();

//index -users
router.get("/", (req, res) => {
    res.send("Hello Users");
});

//show route
router.get("/:id", (req, res) => {
    res.send("get show User ");
});

//post - route
router.post("/", (req, res) => {
    res.send("post User ");
});

//delete route
router.delete("/:id", (req, res) => {
    res.send("delete User ");
});

module.exports=router;