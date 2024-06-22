// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus.helper")
const paginationHelper = require("../../helper/pagination.helper")
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
      const pagination = await paginationHelper(req , find);
      // phân trang
      
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
// [Patch] /admin/products/change-status/:id
module.exports.changeStatusSingle = async (req , res) => {
  const id = req.params.id;
  const statusChange = req.body.status;
  await Product.updateOne({
    _id: id
  } , {
    status:statusChange
  })
  res.json({
    code:200
  })
}
// [Patch] /admin/products/change-multiStatus
module.exports.changeStatusAll = async (req , res) => {
  const data = req.body;
  await Product.updateMany({
    _id : data.id
  },{
    status:data.status,
  })
  res.json({
    code:200
  })
}
// [patch] / admin/products/delete/:id
module.exports.deleteProduct = async (req , res) => {
  const id = req.params.id;
  await Product.updateOne({
    _id : id
  },{
    deleted:true
  })
  res.json({
    code:200
  })
}
// [patch] / admin/products/delete-multiProduct
module.exports.deleteMultiProduct = async (req , res) => {
  const data = req.body;
  await Product.updateMany({
    _id : data.id
  },{
    deleted:true
  })
  res.json({
    code:200
  })
}
//[get]/admin/products/trash
module.exports.trash = async (req,res) => {
  const find = {
    deleted: true
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
  const pagination = await paginationHelper(req , find);
  // phân trang
  
  //end phân trang
  const products = await Product
  .find(find)
  .limit(pagination.limitItems)
  .skip(pagination.skip)
res.render("admin/pages/products/trash.pug" , {
    pageTitle :"Thùng rác",
    products : products,
    filterStatus: filterStatus ,
    keyword : keyword , 
    pagination : pagination
});
}
//[delete]/admin/products/trash/permanentlyDelete
module.exports.permanentlyDelete = async (req , res) => {
  const id = req.params.id;
  await Product.deleteOne({
    _id : id
  })
  res.json({
    code:200
  })
}

//[patch]/admin/products/trash/restore
module.exports.restore = async (req , res) => {
  const id = req.params.id;
  await Product.updateOne({
    _id : id
  },{
    deleted:false
  })
  res.json({
    code:200
  })
}

//patch]/admin/products/trash/deleteAndRestore
module.exports.deleteAndRestore = async (req , res) => {
  const {id,task} = req.body;
  switch (task) {
    case "permanentlyDelete":
      await Product.deleteMany({
        _id:id
      })
      break;
    case "restore":
      await Product.updateMany({
        _id:id
      },{
        deleted:false
      })
      break;
  }
  res.json({
    code:200
  })
}