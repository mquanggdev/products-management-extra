const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type:Boolean,
        default:false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
      }
},
{
    timestamps: true // Tự động thêm trường createdAt và updatedAt (https://mongoosejs.com/docs/timestamps.html)
  });

const Product = mongoose.model("Product" , productSchema , "products");

module.exports = Product ;