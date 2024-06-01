// [GET] /admin/products
const Product = require("../../models/product.model");
module.exports.index = async (req ,res) => { 
    const products = await Product.find({
        deleted : false
    }); // đi tìm những bản ghi đi tìm những bản ghi có deleted = false
    res.render("admin/pages/products/index.pug" , {
        pageTitle :"Danh Sach Sản Phẩm",
        products : products
    });
}