// [GET] /admin/products
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus.helper")
const paginationHelper = require("../../helper/pagination.helper")
const systemConfig = require("../../config/system.js");
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
      .sort({
        position:"desc"
      })
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
  req.flash('success', 'Cập nhật trạng thái thành công!');
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
  req.flash('success', 'Cập nhật trạng thái thành công!');
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
  req.flash('success', 'Xóa sản phẩm thành công!');
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
  req.flash('success', 'Xóa sản phẩm thành công!');
  res.json({
    code:200
  })
}
module.exports.changePosition = async (req , res) => {
  const id = req.params.id;
  const position = req.body.position;

  await Product.updateOne({
    _id: id
  }, {
    position: position
  });
  res.json({
    code:200
  })
}
module.exports.create = async (req , res) => {
  res.render("admin/pages/products/create" , {
    pageTitle:"Thêm sản phẩm mới"
  })
}
module.exports.createPost =  async (req , res) => {
  console.log(req.file);
  if(req.file && req.file.filename){
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProducts = await Product.countDocuments({});
    req.body.position = countProducts + 1;
  }
  const newProduct = new Product(req.body);
  await newProduct.save();
  req.flash("success" ,"Thêm sản phẩm thành công");
  res.redirect(`/${systemConfig.PREFIX_ADMIN}/products`);
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