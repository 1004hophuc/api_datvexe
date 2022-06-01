// setup kết nối với database bằng đối tượng trong model
const { sequelize } = require('./models');
const Fingerprint = require('express-fingerprint')

const path = require('path');
const express = require('express');
const { rootRouter } = require('./routers');

const app = express();

// cài đặt fingerprint
app.use(Fingerprint());

// Cài ứng dụng sử dụng kiểu json
app.use(express.json());

// Cài đặt static file
const publicPathDirectory = path.join(__dirname, './public');
app.use("/public", express.static(publicPathDirectory));

// Sử dụng rootRouter cho ứng dụng (để path api/v1 để mà lỡ có nâng cấp ứng dụng thì sẽ dễ dàng chỉnh sửa)
app.use("/api/v1", rootRouter);

// Lắng nghe sự kiện kết nối
app.listen(3000, async () => {
    console.log("App listen on http://localhost:3000");
    // Kiểm tra kết nối với database có thành công không
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})