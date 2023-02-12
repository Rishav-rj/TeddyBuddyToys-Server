const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:Number,

    },
    status:{
        type:String,

    },
    imageStr:{
        type:Array,
  
    },

});



const productList = mongoose.model("products", productSchema)

module.exports = productList;