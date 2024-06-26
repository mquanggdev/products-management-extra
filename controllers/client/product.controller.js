const Product = require("../../models/product.model");
module.exports.index = async (req ,res) => { // đặt tên cho cái export đó , sau đó muốn require thì chỉ cần controller.index thì sẽ import được cái nào có tên như vậy.

    const products = await Product
    .find({
        deleted:false,
        status:"active"
    })
    .sort({
        position:"desc"
    })
    const newProducts = products.map((item) => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0) ;
        return item ;
    })
    res.render("client/pages/products/index.pug" , {
        pageTitle :"Trang Sản Phẩm",
        products : newProducts
    });
}

module.exports.detail = async (req ,res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        slug:slug,
        deleted:false,
        status:"active"
    })
    if(product){
        res.render("client/pages/products/detail.pug" , {
            pageTitle :"Trang chi tiết sản phẩm",
            product: product
        });
    }
    else{
        res.redirect("back");
    }
    
}
