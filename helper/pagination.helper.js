const Product = require("../models/product.model");
const ProductCategory = require("../models/products-category.model");

module.exports = async (req , find) => {
    const pagination = {
        currentPage : 1, 
        limitItems : 4
      }
      if(req.query.page){
        pagination.currentPage = parseInt(req.query.page);
      }
      pagination.skip = (pagination.currentPage - 1) * pagination.limitItems
      const totalProduct = await Product.countDocuments(find);
      const totalPage = Math.ceil(totalProduct / pagination.limitItems);
      pagination.total = totalPage

      return pagination
}