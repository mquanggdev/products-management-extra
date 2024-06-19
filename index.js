const express = require("express");
require("dotenv").config();
// console.log(process.env.PORT); // process.env nó sẽ trả ra những biến mà ta lưu trong env -> nó sẽ trả dưới dạng 1 object
const database = require("./config/database.js"); // lấy dữ liệu từ mongodb
database.connect() ;// gọi đến hàm kết nối
const routeAdmin = require("./routes/client/index.route.js");
const routeClient = require("./routes/admin/index.route.js");
const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser')
// cái này là biến toàn cục có thể chạy trong suốt chương trình -> phục vụ cho đổi tên đường dẫn
const systemConfig = require("./config/system.js");
app.locals.prefixAdmin = systemConfig.PREFIX_ADMIN;
//
app.set('views' , "./views");
app.set('view engine' , 'pug');
app.use(express.static("public"));
// parse application/json
app.use(bodyParser.json())


// Route
routeClient(app);
routeAdmin(app);


app.listen(port , () => {
    console.log(`Đang chạy cổng ${port}`);
})