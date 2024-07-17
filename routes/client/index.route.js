const productRoutes = require("./product.route.js")
const homeRoutes = require("./home.route.js");
const categoryMiddleware = require("../../middleware/client/category.middleware");
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use("/" , homeRoutes)
    app.use("/products" , productRoutes); // thằng use này được dùng bởi vì đằng sau products còn có nhiều trang khác như thêm sản phẩm , sửa xóa sản phẩm ,...., các phương thức nó khác nhau chứ không chỉ riêng với get , còn có patch ,post nên cần dùng use thay vì get vì nếu ghi get thì nó sẽ đổi tất cả các phương thức con phía sau thành get hết , với cả nó còn dùng để tạo các kết nối route chính với các route con
}