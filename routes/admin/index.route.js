const dashboardRoutes = require("./dashboard.route.js");
const systemConfig = require("../../config/system.js");
const productsRoutes = require("./products.route.js");
const productsCategoryRoutes = require("./products-category.route.js");
const rolesRoutes = require("./roles.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.PREFIX_ADMIN; // mục đích tạo ra thằng này để mai sau khách hàng có muốn đổi tên đường dẫn thì cũng có thể linh động được.Lấy nó thông qua một file trong config
    app.use(PATH_ADMIN + "/dashboard" , dashboardRoutes);
    app.use(PATH_ADMIN + "/products" , productsRoutes);
    app.use(PATH_ADMIN + "/products-category" , productsCategoryRoutes);
    app.use(PATH_ADMIN + "/roles" , rolesRoutes);
    app.use(PATH_ADMIN + "/accounts" , accountsRoutes);
    app.use(PATH_ADMIN + "/auth" , authRoutes);
}