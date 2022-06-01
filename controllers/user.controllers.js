const jwt = require('jsonwebtoken');

const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');

const { sequelize } = require('../models')

// const gravatarUrl = require('gravatar-url');

const { User } = require("../models");

const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body;

    try {
        // Tạo avatar mặc định
        const avatarUrl = gravatar.url(email, { protocol: 'http', s: '100' });

        // Tạo 1 chuỗi ngẫu nhiên
        const salt = bcryptjs.genSaltSync(10);

        // Mã hoá cái chuỗi ngẫu nhiên đó + password
        const hashPassword = bcryptjs.hashSync(password, salt);

        // Lưu dữ liệu vào hashPassword
        const newUser = await User.create({ name, email, password: hashPassword, numberPhone, avatar: avatarUrl });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res, next) => {

    const { email, password } = req.body;
    // Tìm ra user đăng nhập dựa trên email
    const user = await User.findOne({
        where: {
            email
        }
    })
    // Kiểm tra user có tồn tại hay không
    if (user) {
        // Kiểm tra password có đúng hay không
        // Dùng bcryptjs.compareSync() truyền vào 2 tham số, 1 là password gửi từ FE lên, 2 là password mình đã tạo
        const isAuth = bcryptjs.compareSync(password, user.password)

        if (isAuth) {
            // Khi login vào chúng ta sẽ tạo token, dùng thư viện jwt chấm đến sign, có 3 tham số (payload, secret key, thời lượng token tồn tại)
            const token = jwt.sign({ email: user.email, type: user.type }, "phuc-101297", { expiresIn: 60 * 60 })
            // Gửi token và message về cho người dùng
            res.status(200).send({ message: "Đăng nhập thành công!", token })
        } else {
            res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng!" })
        }
    } else {
        res.status(404).send({ message: "Không tìm thấy email phù hợp!" })
    }
}

const uploadAvatar = async (req, res) => {
    // Lấy file từ req
    const { file } = req;

    // Lấy đường dẫn hình ảnh
    const urlImage = `http://localhost:3000/${file.path}`;

    // Lấy user từ req sau khi xác thực đăng nhập
    const { user } = req;
    // Tìm user này thông qua email
    const userFound = await User.findOne({
        where: {
            email: user.email
        }
    })

    // Gán đường dẫn hình ảnh cho cái userFound này
    userFound.avatar = urlImage;
    // Sau đó lưu lại cho userFound này
    await userFound.save()

    res.send(userFound);
}

const getAllTrip = async (req, res) => {
    try {
        const [result] = await sequelize.query(
            `select users.name as userName, fromSta.name as fromStation, toSta.name as toStation from users
            inner join tickets on users.id = tickets.user_id
            inner join trips on trips.id = tickets.trip_id
            inner join stations as fromSta on fromSta.id = trips.fromStation
            inner join stations as toSta on toSta.id = trips.toStation;`
        );
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Not found!")
    }

}

module.exports = {
    register,
    login,
    uploadAvatar,
    getAllTrip
}
