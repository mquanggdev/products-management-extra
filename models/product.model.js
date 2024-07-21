const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: String,
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
    createdBy:String,
    updatedBy:String,
    deletedBy:String,
    slug: {
        type: String,
        slug: "title",
        unique: true
      },
    featured: {
      type:String,
      default:"0"
    }
},
{
    timestamps: true // Tự động thêm trường createdAt và updatedAt (https://mongoosejs.com/docs/timestamps.html)
  });

const Product = mongoose.model("Product" , productSchema , "products");

module.exports = Product ;