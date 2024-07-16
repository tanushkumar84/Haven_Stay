const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passsportLocalMongoose = require("passport-local-mongoose");

const usesrSchema=new Schema({
    email:{
        type:String,
        reqiured:true,
    },
});

usesrSchema.plugin(passsportLocalMongoose);

module.exports= mongoose.model("User",usesrSchema);