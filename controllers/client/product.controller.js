const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");

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
        product.priceNew = ((1 - product.discountPercentage/100) * product.price).toFixed(0);
        res.render("client/pages/products/detail.pug" , {
            pageTitle :"Trang chi tiết sản phẩm",
            product: product
        });
    }
    else{
        res.redirect("back");
    }
    
}


module.exports.category = async (req , res) => {
    try {
        const slugCategory = req.params.slugCategory;
        const category = await ProductCategory.findOne({
            slug:slugCategory,
            deleted:false,
            status:"active"    
        })
        const allSubCategory  = [] ;
        const getAllCategory = async (current_id) => {
            const subCategory  = await ProductCategory.find({
                parent_id : current_id,
                status:"active",
                deleted:false,
            });

            for(const sub of subCategory ){
                allSubCategory.push(sub.id);
                await getAllCategory(sub.id);
            }
        }
        await getAllCategory(category.id);

        const products = await Product.find({
            product_category_id: {
                $in:[
                    category.id,
                    ...allSubCategory
                ]
            },
            deleted:false ,
            status:"active",
           
        }).sort({
            position:"desc",
        })
        for (const item of products) {
            item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
          }
        res.render("client/pages/products/index.pug" , {
                pageTitle:category.title,
                products:products
            })
    } catch (error) {
          req.flash("error" , "Không tồn tại danh mục")
    }
    
}