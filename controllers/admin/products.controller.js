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
  try {
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
  } catch (error) {
    res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
  }
}
// [Patch] /admin/products/change-multiStatus
module.exports.changeStatusAll = async (req , res) => {
 try {
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
 } catch (error) {
  res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
 }
}
// [patch] / admin/products/delete/:id
module.exports.deleteProduct = async (req , res) => {
  try {
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
  } catch (error) {
    res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
  }
}
// [patch] / admin/products/delete-multiProduct
module.exports.deleteMultiProduct = async (req , res) => {
 try {
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
 } catch (error) {
  res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
 }
}
// [patch] / admin/products/change-position
module.exports.changePosition = async (req , res) => {
  try {
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
  } catch (error) {
    res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
  }
}
//[get]/admin/products/create
module.exports.create = async (req , res) => {
  res.render("admin/pages/products/create" , {
    pageTitle:"Thêm sản phẩm mới"
  })
}
//[post]/admin/products/create
module.exports.createPost =  async (req , res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/${systemConfig.PREFIX_ADMIN}/products`);
}
//[get]/admin/products/edit/:id
module.exports.edit = async (req , res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id:id,
      deleted:false
    })
    if(product){
      res.render("admin/pages/products/edit" , {
        pageTitle:"Sửa sản phẩm",
        product:product
      })
    }else{
      res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
    }
    
  } catch (error) {
    res.redirect(`${systemConfig.PREFIX_ADMIN}/products`)
  }
  
}
//[post]/admin/products/edit/:id
module.exports.editPatch =  async (req , res) => {
  try {
    const id = req.params.id;
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

    await Product.updateOne({
      _id:id,
      deleted:false
    },req.body)

    req.flash("success" ,"Sửa sản phẩm thành công");
  } catch (error) {
    req.flash("error" ,"Id không hợp lệ");
  }
  
  res.redirect(`back`);
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
//[delete]/admin/products/trash/permanentlyDelete/:id
module.exports.permanentlyDelete = async (req , res) => {
try {
  const id = req.params.id;
  await Product.deleteOne({
    _id : id
  })
  res.json({
    code:200
  })
  } catch (error) {
  console.log(error);
}
}

//[patch]/admin/products/trash/restore/:id
module.exports.restore = async (req , res) => {
try {
    const id = req.params.id;
    await Product.updateOne({
      _id : id
    },{
      deleted:false
    })
    res.json({
      code:200
    })
  } catch (error) {
    console.log(error);
  }
}

//patch]/admin/products/trash/deleteAndRestore
module.exports.deleteAndRestore = async (req , res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
}