const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate:{
    type: Number,
    required: true,
  },
 unit:{
    type: String,
    required: true,
  },
},{
  timestamps: true,
});


const ProductMasterModel = mongoose.model("Product_Master", productSchema);

module.exports = ProductMasterModel;
