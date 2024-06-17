// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus.helper")
module.exports.index = async (req ,res) => {
    const find = {
        deleted: false
      };
    // Lọc theo trạng thái
    const filterStatus = filterStatusHelper(req);
      if(req.query.status) {
        find.status = req.query.status;
      }
      // end lọc theo trạng thái
      // tìm kiếm
      let keyword = "" ;
      if(req.query.keyword){
        find.title = new RegExp(req.query.keyword , "i");
        keyword = req.query.keyword;
      }
      // end tìm kiếm

      // phân trang
      const pagination = {
        currentPage : 1, 
        limitItems : 4
      }
      pagination.currentPage = parseInt(req.query.page);
      pagination.skip = (pagination.currentPage - 1) * pagination.limitItems
      const totalProduct = await Product.countDocuments(find);
      const totalPage = Math.ceil(totalProduct / pagination.limitItems);
      pagination.total = totalPage
      //end phân trang
      const products = await Product
      .find(find)
      .limit(pagination.limitItems)
      .skip(pagination.skip)
    res.render("admin/pages/products/index.pug" , {
        pageTitle :"Danh Sach Sản Phẩm",
        products : products,
        filterStatus: filterStatus ,
        keyword : keyword , 
        pagination : pagination
    });
}