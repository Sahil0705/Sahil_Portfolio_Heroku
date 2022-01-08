const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String
    },
    phone:
    {
        type:Number
    },
    message:
    {
        type:String,
        required:true
    }
})

// data base created

// now create a collection

const messageid = new mongoose.model("Messageid",userSchema);

module.exports = messageid;