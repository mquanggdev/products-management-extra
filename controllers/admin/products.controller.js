// [GET] /admin/products
const Product = require("../../models/product.model");
module.exports.index = async (req ,res) => {
    const find = {
        deleted: false
      };
    
      const filterStatus = [
        {
          name: "Tất cả",
          status: "",
          class: ""
        },
        {
          name: "Hoạt động",
          status: "active",
          class: ""
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
          class: ""
        }
      ];
    
      if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
      } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
      }
    
      if(req.query.status) {
        find.status = req.query.status;
      } 
      const products = await Product.find(find);
    res.render("admin/pages/products/index.pug" , {
        pageTitle :"Danh Sach Sản Phẩm",
        products : products,
        filterStatus: filterStatus
    });
}