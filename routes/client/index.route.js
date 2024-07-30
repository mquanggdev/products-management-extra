const productRoutes = require("./product.route.js")
const homeRoutes = require("./home.route.js");
const cartRoute = require("./carts.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartMiddleware = require("../../middleware/client/carts.middleware.js");
const searchRoute = require("./search.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const userMiddleware = require("../../middleware/client/user.middleware");

module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(userMiddleware.infoUser);
    app.use(cartMiddleware.cartId);
    app.use("/" , homeRoutes)
    app.use("/products" , productRoutes); // thằng use này được dùng bởi vì đằng sau products còn có nhiều trang khác như thêm sản phẩm , sửa xóa sản phẩm ,...., các phương thức nó khác nhau chứ không chỉ riêng với get , còn có patch ,post nên cần dùng use thay vì get vì nếu ghi get thì nó sẽ đổi tất cả các phương thức con phía sau thành get hết , với cả nó còn dùng để tạo các kết nối route chính với các route con
    app.use("/search", searchRoute);
    app.use("/cart", cartRoute);
    app.use("/checkout", checkoutRoute);
    app.use("/user", userRoute);
}