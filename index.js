const express = require("express");
require("dotenv").config();
// console.log(process.env.PORT); // process.env nó sẽ trả ra những biến mà ta lưu trong env -> nó sẽ trả dưới dạng 1 object
const database = require("./config/database.js"); // lấy dữ liệu từ mongodb
database.connect() ;// gọi đến hàm kết nối

const routeAdmin = require("./routes/client/index.route.js");
const routeClient = require("./routes/admin/index.route.js");

const app = express();
const port = process.env.PORT;


app.set('views' , "./views");
app.set('view engine' , 'pug');
app.use(express.static("public"));

// Route
routeClient(app);
routeAdmin(app);


app.listen(port , () => {
    console.log(`Đang chạy cổng ${port}`);
})