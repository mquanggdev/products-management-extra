const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

// get/admin/products-category
module.exports.index = async (req ,res) => {
    res.render("admin/pages/products-category/index.pug" , {
    });
}
// [GET]/admin/products-category/create
module.exports.create = async (req ,res) => {
    res.render("admin/pages/products-category/create.pug" , {
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
