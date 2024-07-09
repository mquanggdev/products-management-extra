const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTreeCategory.helper");

// get/admin/products-category
module.exports.index = async (req ,res) => {
    const productCategory = await ProductCategory.find({
      deleted:false
    })
    res.render("admin/pages/products-category/index.pug" , {
      pageTitle:"Trang Danh mục sản phẩm",
      records:productCategory

    });
}
// [GET]/admin/products-category/create
module.exports.create = async (req ,res) => {
    const categories = await ProductCategory.find({
      deleted:false
    })
    const newCategories = createTreeHelper(categories);
    res.render("admin/pages/products-category/create.pug" , {
      categories:newCategories
    });
}

// [POST]/admin/products-category/createPost
module.exports.createPost = async (req ,res) => {
    try {
      if(req.body.position) {
        req.body.position = parseInt(req.body.position);
      } else {
        const countProducts = await ProductCategory.countDocuments({});
        req.body.position = countProducts + 1;
      }
      const newProductCategory = new ProductCategory(req.body);
      await newProductCategory.save();
      req.flash("success" ,"Thêm danh mục sản phẩm thành công");
      } catch (error) {
        console.log(error);
      }
      res.redirect(`/${systemConfig.PREFIX_ADMIN}/products-category`);
}
