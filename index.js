const express = require("express");
const mongoose = require("mongoose")
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
//flash
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//slug
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
var methodOverride = require('method-override')
var path = require('path');


app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));
// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Flash
app.use(cookieParser('Yalidas'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash
app.use(methodOverride('_method'))

//timy
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Route
routeClient(app);
routeAdmin(app);


app.listen(port , () => {
    console.log(`Đang chạy cổng ${port}`);
})