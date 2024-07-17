// [GET] /admin/dashboard
module.exports.index = (req ,res) => {
    res.render("admin/pages/profile/index.pug" , {
        pageTitle: "Trang thông tin cá nhân"
    });
}