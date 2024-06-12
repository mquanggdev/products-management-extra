// [GET] /admin/products
const Product = require("../../models/product.model");
module.exports.index = async (req ,res) => {
    const find = {
        deleted: false
      };
    // Lọc theo trạng thái
      const filterStatus = [
        {
          name: "Tất cả",
          status: "",
        },
        {
          name: "Hoạt động",
          status: "active",
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
        }
      ];   
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
      const products = await Product.find(find);
    res.render("admin/pages/products/index.pug" , {
        pageTitle :"Danh Sach Sản Phẩm",
        products : products,
        filterStatus: filterStatus ,
        keyword : keyword
    });
}