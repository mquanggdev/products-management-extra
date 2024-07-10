const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records
  });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm Mới Nhóm quyền"
      });
}

// [Post] /admin/roles/create
module.exports.createPost = async (req, res) => {
    if(req.body){
        const newRoles = new Role(req.body);
        await newRoles.save();

        req.flash("success","Thêm mới sản phầm thành công")
        res.redirect(`/${systemConfig.PREFIX_ADMIN}/roles`);
    }
    else{
        req.redirect(`/${systemConfig.PREFIX_ADMIN}/roles`);
    }
  }