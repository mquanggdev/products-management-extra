const Role = require("../../models/roles.model");
const Account = require("../../models/accounts.model");
const md5 = require('md5');
const generateHelper = require("../../helper/generate.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted:false,
  })
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });

    record.roleTitle = role.title;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Tài khoản admin",
    records:records
  });
}

// [GET] /admin/roleaccounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
      }).select("title");
    
      res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản admin",
        roles: roles
      });
}
// [Post] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    if(req.body){
        req.body.password = md5(req.body.password);
        req.body.token = generateHelper.generateRandomString(30);

        const account = new Account(req.body);
        await account.save();

        req.flash("success","Thêm tài khoản thành công")
        res.redirect(`/${systemConfig.PREFIX_ADMIN}/accounts`);
    }
    else{
        req.redirect(`/${systemConfig.PREFIX_ADMIN}/accounts`);
    }
  }


