const Product = require("../../models/product.model");
module.exports.index = async (req ,res) => { 
    const products = await Product.find({});
    const newProducts = products.map((item) => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0) ;
        return item ;
    })
    res.render("admin/pages/products/index.pug" , {
        pageTitle :"Danh Sach Sản Phẩm",
        products : newProducts
    });
}

module.exports.add = (req ,res) => { 
    res.send("client/pages/products/index.pug");
}