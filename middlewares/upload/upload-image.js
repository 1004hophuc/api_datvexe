const mkdirp = require('mkdirp')
// upload file
const multer = require('multer');

const uploadImage = (type) => {

    // Tạo đường dẫn cần lưu trước
    const made = mkdirp.sync(`./public/images/${type}`)

    // Tạo trước chỗ lưu và tên hình cần lưu
    const storage = multer.diskStorage({
        // chỗ cần lưu
        destination: (req, file, cb) => {
            cb(null, `./public/images/${type}`); // setup chỗ cần lưu file,
            file
        },
        // đuôi file
        filename: (req, file, cb) => {
            cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file
        },
    });

    // Tạo biến upload truyền vào object với key là cái chỗ lưu và tên hình cần lưu mình đã tạo (storage)
    const upload = multer({
        storage: storage, fileFilter: (req, file, cb) => {
            // list ra danh sách các đuôi quy định
            const extensionImageList = [".png", ".jpg"];
            // lấy cái đuôi của file up lên (cắt 4 kí tự cuối)
            const extension = file.originalname.slice(-4);
            // so sánh xem cái đuôi của file up lên có nằm trong danh sách quy định không, nếu có thì cho up, không thì huỷ
            const check = extensionImageList.includes(extension);

            if (check) {
                cb(null, true)
            } else {
                cb(new Error('Invalid extension'));
            }
        }
    });
    return upload.single(type)
}

module.exports = {
    uploadImage
}