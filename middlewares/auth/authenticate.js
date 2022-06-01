const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    // Lấy token mà user gửi lên trong phần header
    const token = req.header("token");
    try {
        // Kiểm tra token này có hợp lệ không, dùng thư viện jwt chấm đến phương thức verify, cần 2 tham số là token và secret key
        const decode = jwt.verify(token, "phuc-101297");
        console.log('decode', decode);
        if (decode) {
            // Cho FE biết được ai là người thực hiện chức năng này bằng cách gán decode lên req = user, nếu loại client thì thông báo không có quyền
            req.user = decode;
            return next();
        } else {
            res.status(401).send("Bạn chưa đăng nhập");
        }
    } catch (error) {
        res.status(401).send("Bạn chưa đăng nhập");
    }

}

module.exports = {
    authenticate
}