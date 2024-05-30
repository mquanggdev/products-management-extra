const productRoutes = require("./product.route.js")
const homeRoutes = require("./home.route.js");
module.exports = (app) => {
    app.get("/" , homeRoutes)
    app.use("/products" , productRoutes); // thằng use này được dùng bởi vì đằng sau products còn có nhiều trang khác như thêm sản phẩm , sửa xóa sản phẩm ,...., bình thường cần phải /products/ rồi nhập link đằng sau mới đùng , nhưng như thế rất dài mà lặp lại nên dùng use sẽ rút ngắn đi.
}