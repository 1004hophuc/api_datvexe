// import thư viện express vào
const express = require('express');
const { stationRouter } = require('./station.router');
const { fingerRouter } = require('./test-fingerprint.router');
const { tripRouter } = require('./trip.router');
const { userRouter } = require('./user.router');

// Tạo rootRouter để quản lý tất cả các router của tất cả model
const rootRouter = express.Router();

// Sử dụng router nào thì lấy đường dẫn của router đó vào
rootRouter.use('/stations', stationRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/trips', tripRouter);
rootRouter.use('/test-fingerprint', fingerRouter)


// export rootRouter để đem qua server sài
module.exports = {
    rootRouter
}