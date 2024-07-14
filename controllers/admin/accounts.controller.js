const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Tài khoản admin",
  });
}


