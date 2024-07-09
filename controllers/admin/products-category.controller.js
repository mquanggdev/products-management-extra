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

// [GET]/admin/products-category/edit/:id
module.exports.edit = async (req ,res) => {
  try {
    const id = req.params.id;
    const category = await ProductCategory.findOne({
      _id: id,
      deleted: false
    });
    const categories = await ProductCategory.find({
      deleted:false
    })
    const newCategories = createTreeHelper(categories);
    res.render("admin/pages/products-category/edit.pug" , {
      pageTitle:"Sửa danh mục sản phẩm",
      categories:newCategories,
      category:category

    });  
  }
  catch(e){
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/products-category`);
  }
  
}

// [Patch]/admin/products-category/edit/:id
module.exports.editPatch = async (req ,res) => {
  try {
    const id = req.params.id;

    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countCagegory = await ProductCategory.countDocuments({});
      req.body.position = countCagegory + 1;
    }
  
    await ProductCategory.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    req.flash("success", "Cập nhật danh mục thành công!");
    res.redirect(`back`);
  }
  catch(e){
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/products-category`);
  }
  
}
