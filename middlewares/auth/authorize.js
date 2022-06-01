const authorize = (arrType) => (req, res, next) => {
    // Lấy user từ xác thực người dùng xong rồi đưa qua bên này
    const { user } = req
    // Kiểm tra user.type có nằm trong mảng này hay không, nếu > -1 sẽ là có và người lại
    if (arrType.findIndex(ele => ele === user.type) > -1) {
        // Nếu đúng thì nó sẽ cho đến bước tiếp theo next(), sai thì nó dừng.
        next()
    } else {
        res.status(403).send({ message: "Bạn đã đăng nhập nhưng không có quyền truy cập vào đây!" })
    }
}

module.exports = {
    authorize
}