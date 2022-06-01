/*
================SÀI NODEJS TRÊN YARN================

CÀI ĐẶT YARN:
    - sudo npm i -g yarn
    - export PATH="$PATH:$(npm bin -g)"
    - export PATH="$PATH:/Users/myname/.npm-global/bin"

KHỞI TẠO PROJECT:
    - yarn init

CÀI CÁC THƯ VIỆN CẦN THIẾT:
    - yarn add express sequelize mysql2

CÀI THƯ VIỆN CẦN THIẾT CHO MÔI TRƯỜNG DEV:
    - yarn add sequelize-cli --dev

KHỞI TẠO PROJECT VỚI SEQUELIZE:
    - yarn sequelize init

Trong file server import thư viện express vào, sau đó cài những cái cần thiết:
CÀI ỨNG DỤNG SỬ DỤNG KIỂU JSON:
    - app.use(express.json());

CÀI STATIC FILE:
    - Cần import thư viên path vào
    - Sau đó dùng thư viện path để tạo ra đường dần mà mình cần:
        const publicPathDirectory = path.join(__dirname,'./public')

    - Sau đó sử dụng đường dẫn này vào static file bằng cách sử dụng express.static
        app.use(express.static(publicPathDirectory))

LẮNG NGHE SỰ KIỆN KẾT NỐI
    app.listen(3000, () => {
        console.log("App run on localhost 3000")
    })

SEQUELIZE:
    - Để biết được các câu lệnh của sequelize-cli thì gõ yarn sequelize

KẾT NỐI DATABASE VỚI SEQUELIZE:
    - import sequelize từ file model vào
    - Sau đó dùng sequelize này chấm đến authenticate() để kiểm tra (bỏ vào try catch và async await)

DÙNG SEQUELIZE ĐỂ TẠO DATABASE:
    - yarn sequelize db:create (tạo db trong workbench trùng với tên trong file config)
*/

/*
========TẠO MODEL hay nói cách khác là TẠO TABLE bên trong database========

DÙNG LỆNH SEQUELIZE ĐỂ TẠO RA MODEL:
    - sequelize model:generate --name name_table --atrributes name:string, address:string, province:string;
    - Sau khi tạo ra thì trong file model đã có file name_table mà mình.js chứa các code để tạo ra được model

ĐỒNG BỘ TABLE(MODEL) VỪA TẠO RA VỚI DATABASE:
    - Sau khi tạo ra model thì quay lại với myslqWorkBench vẫn chưa có, do đó ta cần phải đồng bộ giữa sequelize và mysql với nhau
    - Sử dụng lệnh:
        - yarn sequelize db:migrate (Nó sẽ chạy đồng bộ những migrate nào mà chưa được chạy)

    -> Nó sẽ sinh ra 2 bảng trong mysql (có 1 bảng migrations)
        + Bảng kia nó sẽ lưu lại cái model mà chúng ta vừa tạo ra để trong future nó sẽ backup được
        + Vì nếu lỡ có 1 ngày bạn muốn xoá 1 model mà bạn đã tạo ra. Bạn không thể tác động đến database, vì nó sẽ ảnh hưởng đến toàn bộ app của bạn. Do đó bạn sẽ tác động lên file migrations (ở chỗ down, drop)

XOÁ MODEL TRONG MIGRATION:
    - yarn sequelize db:migrate:undo (nó sẽ revert() về cái bước trước đó)

LẤY LẠI MODEL ĐÃ DROP:
    - yarn sequelize db:migrate

CÓ THỂ CHỈNH SỬA FILE MODEL THEO Ý MÌNH(RÀNG BUỘC)
TRONG FILE MIGRATE BẠN DECLARE NHƯ NÀO THÌ NÓ SẼ IN RA NHƯ THẾ
*/

/*
==============CRUD STATION TABLE===============

TẠO FOLDER CONTROLLER:
    - Chịu trách nhiệm nhận request từ client gửi lên và xử lý dữ liệu, sau đó nó sẽ response và trả dữ liệu về cho người dùng để họ hiển thị lên màn hình
    - Mỗi model sẽ có 1 controller
    - Từ controller sẽ lấy dữ liệu cần thiết của người dùng lên
    - Sau khi lấy dữ liệu rồi thì bạn sẽ kéo nó vào model

    - import model vào file controller, sau đó từ model tạo ra các CRUD để gửi dữ liệu lên cho người dùng

    - Sau khi có controller, bước tiếp theo để controller tương tác được với các API mà người dùng gửi lên theo method và url thì mình sẽ đi thiết kế các router

TẠO FOLDER ROUTER:
    - import thư viện express vào
    - Tạo router: const stationRouter = express.Router();
        stationRouter.post('/', controller)

TẠO ROOT ROUTER:
    - Vì mỗi model có 1 router khác nhau, nên cần phải tạo file rootRouter để quản lý nó
    - Sau khi tạo xong rootRouter thì export nó ra để cho server lấy mà sài

    // Ở rootRouter sử dụng router nào thì lấy đường dẫn của router đó vào
    rootRouter.use('/stations', stationRouter);

CHẠY THỬ: nó sẽ chạy trên đường dẫn http://localhost:3000/api/v1/

TRONG FILE INDEX:
    // sau khi nối đường dẫn = dirname với file (file ở đây chính là cái model) thì chúng ta sẽ có đường dẫn đi trực tiếp đến model này
    // các file này đều sẽ export ra 1 function đối với mỗi model, nó sẽ truyền vào 2 tham số là sequelize và Sequelize.DataTypes
    // sau khi nhận được được hàm với 2 tham số thì nó sẽ lưu vào object db
*/

/*
SEARCH GẦN GIỐNG:
    - import {Op} from 'sequelize'
        - const listStation = await Station.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                }
            });

VALIDATION SEQUELIZE:
    - sequelize.org -> validation & constraints
    - Đối với isIn: [["ab", "cd"]]: phải nhập đúng 1 trong những feild thuộc mảng này

    - Config lỗi thông báo thành tiếng Việt:
            validate: {
        checkLen(value) {
            if (value.length > 5 && value.length < 20) {
            return true;
            } else {
            throw new Error("Độ dài phải từ 5 - 20 ký tự")
        }
        },
    },

VALIDATION EXPRESSJS
    - Ở đây bạn gặp vấn đề là xoá cái object có id đó rồi nhưng nếu bấm xoá lần nữa thì nó vẫn xoá, do vậy cần dùng đến expressjs
    - Và 1 vấn đề nữa là khi update nếu update cùng id thì nó sẽ trả về lỗi 500, mà không nói gì cả dẫn đến không biết được đó là lỗi gì, do vậy cần phải sử dụng expressjs

    - Do đó trước khi UPDATE OR DELETE thì kiểm tra thằng đó có tồn tại hay chưa, nếu chưa tồn tại thì báo về cho người dùng không tồn tại nên không UPADTE VÀ SỬA ĐƯỢC

    -> Viết nó trong router phía sau tham số path -> gọi là middleware
        - Kiểm tra nếu tồn tại thì cho chạy next()
    - Thông thường người ta sẽ viết trong 1 cái folder gọi là middleware cho dễ quản lý: phần mềm ở giữa controller và router
        -> Thông thường sẽ có nhiều model để chúng ta build middleware, do vậy phải tạo hàm sau đó truyền tham số để các model sau có thể tái sử dụng.
        - Kiểm tra dữ liệu thì tạo ra folder validate.

SEEDER SEQUELIZE (Cách tạo ra dữ liệu giả để có thể test CRUD)
    - Khi bạn undo migrate (tức là xoá model vừa tạo): yarn sequelize db:migrate:undo, sau đó bạn muốn tạo lại model: yarn sequelize db:migrate thì dữ liệu đã tạo trước đó sẽ biến mất
    - Vì thế sử dụng seeder sequelize để lưu những dữ liệu đã tạo lại, khi cần dùng thì lấy ra

    - Để tạo ra seeder:
    - Dùng lệnh: yarn sequelize seed:generate --name (đặt tên cho seeder)
        -> Sau đó tạo dữ liệu mà bạn muốn lưu trữ cho sau này để test

    - Để chạy:
    - Tiếp theo: yarn sequelize db:seed:all (để chạy được cái seeder đó và để lưu vào database)

    - Để xoá:
    - Để xoá các dữ liệu giả này: thì dùng cái down ở trong seeder, sau đó gõ lệnh: yarn sequelize db:seed:undo:all
*/

/*
=============Authentication User===============

CHUYỂN PASSWORD MÃ HOÁ THÀNH SỐ KHÓ ĐỌC:
    - Dùng thư viện bcryptjs
    - Ở controller của user hãy require nó vào

    - Ở try tạo ra chuỗi ngẫu nhiên, sau đó ta lấy chuỗi ngẫu nhiên này đem đi mã hoá thì nó sẽ bảo mật tốt hơn
        - const salt = bcryptjs.genSaltSync(): muốn tạo chuỗi ngẫu nhiên bao nhiêu ký tự thì điền vào

    - Sau đó mã hoá cái chuỗi ngẫu nhiên đó và password
        - const hashPassword = bcryptjs.hashSync(password, salt): truyền vào 2 tham số là password và chuỗi ngẫu nhiên

    - Lưu dữ liệu vào hashPassword
        const newUser = await User.create({ name, email, password: hashPassword, numberPhone });

MẶC ĐỊNH TYPE CHO USER:
    - Ở file migrate mình thêm vào field type thuộc tính defaultValue: "CLIENT", để bất cứ người nào đăng ký mà không chỉ định giá trị type sẽ mang giá trị "CLIENT"
    - Sau khi thêm thuộc tính này vào thì cần chạy lại lệnh migrate undo, sao đó chạy lại migrate:generate để nó update

TOKEN: (gồm 3 phần) thường dùng thư viện json web token để làm
    1/ Header: quy định loại giải thuật mã hoá token, loại token
    2/ Payload: data mà bạn cần lưu trong token (tài khoản, mật khẩu, loại người dùng...)
    3/ Signature: là 1 key cho mình tự định nghĩa để tính bảo mật cao hơn.
    -> Token có nghĩa là nếu chúng ta dùng tài khoản và mật khẩu đăng nhập 1 lần thì nó sẽ ghi nhớ lưu vào localstorage để sau này không cần đăng nhập lại mà bạn vẫn có thể vào.

    - Cần cài đặt thư viện json web token
        - yarn add jsonwebtoken
    - Khi login vào chúng ta sẽ tạo token, dùng thư viện jwt chấm đến sign, có 3 tham số (payload, secret key, thời lượng token tồn tại)
        - secret key là 1 key bảo mật dùng để verify xem token đó có hợp lệ không.
    - const token = jwt.sign({email: user.email, type: user.type}, "phuc-101297", {expiresIn: 60 * 60}):
        - phuc-101297: key do tự mình đặt
        - {expiresIn: 60 * 60}: thời lượng 1 giờ
    - Sau đó gửi token này về cho FE để nó lưu vào local storage

GIẢI MÃ TOKEN: (jwt.io) VÀ XÁC THỰC NGƯỜI DÙNG

    - AUTHENTICATE: xác thực người dùng đã đăng nhập hay chưa

    - Bỏ token vào encoded
    - Để xác thực được người dùng loại gì thì ta sử dụng middleware
    - Để mà sau khi người dùng đăng nhập xong thì ta sẽ có token và mã hoá cái token này để đưa qua bước xác thực người dùng
    - Kiểm tra token này có hợp lệ hay không để xác thực người dùng rằng họ đã đăng nhập hay chưa, tránh trường hợp dùng token bậy. Để kiểm tra thì dùng verify của jwt truyền vào 2 tham số là token và secret key

    - Đầu tiên, lấy token mà user gửi lên, thường thì ở trong phần header:
        - const token = req.header("token");

    -> Kiểm tra đăng nhập hay chưa xong nó sẽ tạo ra 1 cái key mới (req.user = decode), decode là phần được giải mã từ token. Dùng key mới này để qua bước tiếp theo là phân quyền người dùng

PHÂN QUYỀN NGƯỜI DÙNG:

    - AUTHORIZE: phân quyền

    - Mục đích của giải mã token dùng để phân quyền, nếu loại user là admin thì sẽ làm được những việc gì và loại user là client thì sẽ làm được những việc gì. Gọi tắt là xác thực người dùng
*/

/*
UPLOAD FILE MULTER BASIC:
    - Thông thường khi upload file lên bạn sẽ có 2 việc:
        1/ Đó là lưu hình ảnh vào file server, lưu file excel vào server
        2/ Lưu đường dẫn vào trong database

    - Thư viện dùng để upload file lên:
        yarn add multer

    // upload file
        const multer = require('multer');
    // Tạo biến upload truyền vào object với điểm đến (đường dẫn cần lưu)
    - Nói với multer là file hình up lên sẽ được lưu ở đâu
        const upload = multer({ dest: "./uploads/avatars" })

    - Lưu ý: ở upload.single('avatar') với key là 'avatar' thì bên postman phải nhập đúng key là 'avatar' chỗ form data, nếu nhập sai nó sẽ báo lỗi ngay

UPLOAD FILE MULTER ADVANCED:
    - Cần lưu vào folder public và tạo đuôi hình
    - Đầu tiên cần tạo trước chỗ lưu và tên hình cần lưu:
        - storage = multer.diskStorage(), diskStorage chính là cái chỗ ổ đĩa cần lưu, diskStorage là 1 object chứa nhiều key

    CHỖ LƯU:
        - Key thứ nhất: destination (đường dẫn cần lưu), và destination là 1 function có 3 tham số (req,file,cb):
            - gọi cb và truyền vào 2 tham số, tham số đầu tiên là null, tham số thứ 2 là chỗ lưu
        - Key thứ hai: filename (tên hình) và filename cũng là 1 function có 3 tham số (req,file,cb)
            - gọi cb và truyền vào 2 tham số, tham số đầu tiên là null, tham số thứ 2 là đặt lại đúng cái tên mà mình upload lên =  cách sử dụng file.originalname

        - Cần phân loại ra nhiều folder: folder dành cho image, folder dành cho file excel,... folder avatars, folder vexe, folder chuyến xe, do vậy cần phải tạo trước khi upload

        CB LÀ GÌ:
            - cb là 1 callbackfunction, thường để test hàm cb, người ta sẽ tạo ra folder playgroud, sau đó tạo file test-cb.js
            - cb nhận vào 2 tham số là error và value, nếu có lỗi thì nó sẽ thông báo error, còn nếu tham số error == null thì nó không có lỗi và nó sẽ xử lý cái tiếp theo là value
            (Trước đây chưa có promise or async await thì người ta sẽ xử lý bất đồng bộ theo kiểu này)

        - // Tạo biến upload truyền vào object với key là cái chỗ lưu và tên hình cần lưu mình đã tạo (storage)
                const upload = multer({ storage: storage })

        -> Nhưng có 1 điều là nếu bạn upload cùng hình ảnh lên lần 2-3 thì nó sẽ không up lên được, vì nó sẽ trùng tên và bị ghi đè, vì thế chỗ tên file cần thêm thời gian upload để nó phân biệt và có thể up lên được nhiều hình
            (Ghi đè sẽ dẫn ra nhiều cái, ví dụ như 2 bạn cùng up tên file giống nhau mà khác hình thì nó sẽ thay đổi hình của bạn kia)

UPLOAD FILE FILTER:
    - Dùng để quy định những loại file được upload lên, kích thước file được upload lên
    - Do đó trước khi up lên phải lọc ra.
    - Để làm được tính năng này, chỗ biến upload gọi thêm 1 cái key gọi là fileFilter, và fileFilter(req, file, cb) là 1 function, cũng có 3 tham số

-> Phải kiểm tra người dùng có đăng nhập hay chưa, đăng nhập rồi mới cho upload, do đó phải đưa cái middleware authenticate vào

SAVE PATH: (lưu đường dẫn vào trong database)
    - Để lưu đường dẫn hình ảnh vào trong database sẽ lưu thông qua user
    - user ở đây là mình mã hoá lúc authenticate, sau đó truyền cho uploadImage, sau đó truyền cho uploadAvatar, từ đây mình sẽ gán ngược lại đường dẫn cho user này (ở đây mình có thể lấy được user từ req, sau đó gán đường dẫn cho nó)

    - Từ uploadAvatar, mình sẽ bóc tách user, sau đó dùng findOne để tìm cái user đó thông qua email, sau đó gán lại đường dẫn cho nó và response lên
    - Để gán đường dẫn, mình cần thêm thuộc tính avatar bên trong model và bên trong migrate
    - Sau khi gán xong phải undo cái migrate đi, sau đó generate cái migrate lại để cập nhật dữ liệu
    - Sau đó nhớ refresh all để cập nhật dữ liệu trở lại

GÁN LINK HÌNH CHO THUỘC TÍNH TRONG USER:
    - Ở controller uploadAvatar, ta sẽ lấy ra link hình
    - Đầu tiên ta sẽ lấy hình mà user gửi lên với req: const file = req.file
    - Từ file đó ta sẽ lấy path để có thể lưu vào database, nhưng path đó phải được nối với đường dẫn mà ta đã khai báo trước đó: http://localhost:3000/path
    - Nhưng mỗi lần lưu thì chúng ta phải xoá chữ public đi + kết hợp với local, do đó ở chỗ static file bên server chúng ta sẽ cho thêm đường dẫn /public vào:
        - app.use("/public", express.static(publicPathDirectory));

    - Thì lúc này cái thư mục static file chúng ta đang hướng tới là public, thì nếu bạn nhập localhost:3000/ thì nó sẽ dẫn tới thư mục public luôn

    - Sau đó chúng ta sẽ tạo đường dẫn cho hình bằng cách kết hợp đường dẫn đến thư mục public + đường dẫn hình (file.path). Trong file này có rất nhiều thuộc tính, trong có có path
    - Tiếp theo gán đường dẫn hình ảnh đó cho thuộc tính avatar của userFound, lúc đó ta đã xử lý xong


UPLOAD FILE MKDIRP: (make directory path) sử dụng thư viện mkdirp
    - Dùng để tạo ra destination cho đường dẫn đến thư mục, vì nếu sai thư mục thì code vẫn thực thi nhưng trong postman sẽ hiển thị lỗi không tìm thấy đường dẫn
    - Để tạo thư mục này: sử dụng thư viện yarn add mkdirp.

    - Trước khi tạo ra thư mục thì ta hay tạo ra đường dẫn thư mục trước.
    - Nhưng mình muốn truyền động, vì sau này có nhiều thư mục muốn truyền vào hình ảnh khác nhau, ví dụ như avatar, user, product. Do đó nên truyền type cho function uploadImage()

GRAVATAR: sử dụng thư viện gravatar-url
    - Mục đích dùng gravatar để nếu người dùng đăng ký tài khoản thì mặc định cái field avatar sẽ có hình ảnh mặc định, vì nếu hình ảnh mặc định không có nó sẽ mang giá trị null, khi mang giá trị null thì khi mình upload lại avatar thì nó sẽ bị lỗi.

    - Đo đó, cần cài đặt thư viện add yarn gravatar-url
    - Và ở controller ta đưa thư viện này vào, gửi vào nó cái email để nó tạo ra avatar mặc định
    - Sau đó thêm thuộc tính avatar vào trong newUser với value là avatar mặc định đó
*/

/*
LUÔN LUÔN LƯU KHOÁ PHỤ BÊN TRONG BẢNG NHIỀU

SEQUELIZE liên kết 2 bảng (model stations và trips vào với nhau)

- Stations và Trips có mối quan hệ 1 nhiều. Luôn luôn lưu khoá phụ bên trong bảng nhiều
- Đối với bảng 1:
    static associate({ Trip }) {
      // define association here
      // hàm liên kết giữa các table (model) lại với nhau
        this.hasMany(Trip, { foreignKey: "fromStation" });
        this.hasMany(Trip, { foreignKey: "toStation" });
    }
- Đối với bảng nhiều:
    static associate({ Station }) {
      // define association here
        this.belongsTo(Station, { foreignKey: "fromStation" });
        this.belongsTo(Station, { foreignKey: "toStation" });
    }

- Để liên kết được 2 bảng lại với nhau, ngoài thao tác trong model, ta sẽ đặt (lưu) khoá phụ bên trong bảng nhiều, ta sẽ thao tác ở migrate của bảng nhiều
- Khoá phụ luôn có type giống với type của khoá chính bên bảng 1: (lưu ý là model phải trùng với tên table bên trong workbench)

    toStation: {
        type: Sequelize.INTEGER, // type giống với type của khoá chính bên bảng 1
        references: {
          model: 'Stations', // tên bảng trong mysql
          key: 'id' // key muốn lên kết là khoá chính của bảng 1
        }
    },
- Sau đó ta sẽ chạy lên: sequelize db:migrate:undo
- Sau đó sẽ chạy lên: sequelize db:migrate
*/

/*
=========TRIP==========

CHUYỂN ĐỔI ID THÀNH VALUE:
    - Ở đây ta có fromStation: 13, toStation: 14, nhưng không biết tên của bên xe mà id này mang là gì, do đó ta phải sử dụng thủ thuật
    - Trong findAll() ta có object và trong đó có options include để include cái model Station (nơi mà mình muốn hiển thị bến cho cái id)

    -> include kiểu như là trong 1 model có chứa 1 cái khoá phụ (include là khoá phụ), từ khoá phụ này chúng ta sẽ truy xuất đến 1 cái table or model khác để lấy dữ liệu thì dùng từ khoá include

    - include chứa giá trị là 1 cái mảng, vào trong mảng này chứa object có những cái key (model, as), model là cái model mà bạn muốn liên kết tới, as là setup cho nó phụ thuộc vào assosiation
        include: [
                    {
                        model: Station,
                        as: "from"
                    },
                    {
                        model: Station,
                        as: "to"
                    },
                ]

    - Ở trong model trip cũng thêm thuộc tính as giống như trong controller:
        this.belongsTo(Station, { foreignKey: "fromStation", as: "from" });
        this.belongsTo(Station, { foreignKey: "toStation", as: "to" });
    - Tương tự trong model station cũng thêm thuộc tính as giống như trong controller

POSTMAN VARIABLE:
    - Trong url của các phương thức trong postman mình thấy lặp lại nhiều chỗ này http://localhost:3000/api/v1, và nếu như chỉnh sửa đường dẫn thì cần chỉnh sửa rất nhiều chỗ, lên đến cả 1000 chỗ. Do đó cần tạo biến trên postman để lưu trữ
    - Nhấn vào biểu tượng con mắt trên postman, sao đó tạo biến
    - Khi sử dụng biến thì nhớ chuyển qua evironment mà mình đã thiết lập
    - Đưa url vào trong {{url}} + đường dẫn tiếp theo

FINGER PRINT: sử dụng thư viện finger print: yarn add express-fingerprint
    - Thư viện finger print dùng để app của chúng ta tự động nhận diện được đang sử dụng máy gì (window hay ios để mà cho phép download xuống file với đuôi phù hợp)
    - Vào server: const Fingerprint = require('express-fingerprint')
    - Tạo controller fingerprint, sau đó res kết quả lên
    - Tạo thư mục cho client (FE) và test thử, nó sẽ tự nhận diện thiết bị sử dụng app là window hay macos

    - Ở file client mình import cdn của axios vào file index.html, trong file index.js viết axios gọi api của fingerprint để kiểm tra:
                    axios({
                    method: "GET",
                    url: ""
                })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })

FRONTEND và BACKEND CÙNG CHẠY TRÊN 1 LOCALHOST:
    - Để frontend và backend cùng chạy được trên 1 localhost thì cài thêm extension: "ALLOW CORS"

TICKET MIGRATION:
    - Tạo model ticket migration, model này có thuộc tính là 2 khoá phụ và 1 id, tuy nhiên id đã được tạo tự động, còn foreign key không được khai báo khi khởi tạo, mà chỉ tạo name của table thì không được, do đó sau khi tạo xong table thì vào trong model xoá cái id đi (vì id đã được tạo mặc định)
    - Lưu ý, đối với những model không có attribute thì trong modelName.init({},) tham số đầu tiền luôn là object rỗng

    - Đối với những model có mối quan hệ nhiều nhiều, thì phải tạo ra 1 model phụ để kết nối 2 bảng đó lại với nhau (ở đây là user và trip), còn table ticket chính là bảng phụ
        - 1 user đặt bao nhiêu vé thì nó sẽ lưu trên bảng ticket
        - 1 trip có bao nhiêu user thì nó sẽ lưu trên bảng ticket này

    - Trong model phụ này, ở assosiate nhập vào 2 cái model nhiều nhiều đó

SEEDER DATA:
    - Tạo dữ liệu giả để test
    - Sau khi tạo xong thì tốt nhất nên undo rồi hẳn chạy lại
    - Bạn sẽ gặp lỗi: Cannot add or update a child row: a foreign key constraint fails (`vexere_db`.`trips`, CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`fromStation`) REFERENCES `stations` (`id`))
    - Đây là lỗi hệ thống của mysql, nó bắt chúng ta khi thao tác với foreign key thì phải sửa lại biến hệ thống của mysql

        -> Trong mysql: nhập lệnh SET GLOBAL FOREIGN_KEY_CHECKS=0;

QUERY LẤY DỮ LIỆU TỪ NHIỀU TABLE:
    - Lấy tất cả chuyến đi của người dùng
        - Cần quan tâm nơi đến là ở đâu, nơi đi là ở đâu
            -> Bắt buộc có 2 bảng là stations và trips
        - Cần tên người dùng
            -> Bắt buộc phải có bảng users
        - Và vì users và trips liên kết với nhau bằng bảng phụ tickets, do đó mình cần thao tác với 4 bảng

    - Trong sequelize không có cách nào liên kết 4 bảng với nhau cả, do đó phải viết câu lệnh mysql thuần: inner join, left join, right join
    - Đầu tiên phải viết được câu lệnh mysql thuần:
        - Lấy users từ bảng users, từ bảng users này muốn biết được nơi đến nơi đi của user thì phải liên kết với bảng tickets
        - Dùng inner join (bởi vì mình muốn user nào đã từng đi thì lấy ra, còn chưa đi thì thôi)

    1. Từ bảng users và bảng ticket lấy ra những người dùng đã đặt vé (dùng inner join)
        (Lưu ý rằng luôn luôn so sánh khoá chính của bảng 1 với khoá phụ của bảng nhiều)

    2. Sau khi có người dùng đã đặt vé rồi thì ta muốn lấy ra cái chuyến đi của vé đó, bằng cách liên kết giữa bảng tickets và bảng trips
        (Lưu ý rằng luôn luôn so sánh khoá chính của bảng 1 với khoá phụ của bảng nhiều)

    3. Sau khi có được chuyến đi khi kết hợp giữa bảng trips và tickets, ta sẽ kết với với bảng stations để biết được nó đi từ đâu đến đâu
        - (Lưu ý rằng luôn luôn so sánh khoá chính của bảng 1 với khoá phụ của bảng nhiều)

        - (Nếu trong bảng nhiều có nhiều khoá phụ, thì với mỗi khoá phụ ta sẽ alias tên bảng 1 theo khoá phụ đó để lấy ra kết quả, tránh trường hợp trùng dữ liệu)

        - Ví dụ trong bảng nhiều có 2 khoá phụ là fromStation và toStation. Ta sẽ alias bảng 1 là stations theo từng tên của khoá phụ:
            + inner join stations as fromSta on fromSta.id = trips.fromStation
            + inner join stations as toSta on toSta.id = trips.toStation;

    Sau khi có được kết quả như mong muốn, tiếp theo ta tạo controller để viết api cho lệnh này, vì sequelize không hỗ trợ liên kết nhiều bảng. Vì thế ta sử dụng đối tượng sequelize để chấm đến thuộc tính query() và đưa các câu lệnh mysql thuần vào làm điều đó.

    Vì câu lệnh này do user thao tác, nên ta sẽ viết controller trong usercontroller
    - import sequelize từ model vào, sau đó chấm đến thuộc tính query và đưa các câu lệnh thuần vào.
    - Vì kết quả trả về là 1 mảng, cho nên ta sẽ để kết quả bên trong mảng


    - Lấy tất cả các vé mà người dùng đã đặt

TÍNH NĂNG CÒN LẠI:
    - Đặt ghế
    - Lọc chuyến theo giá
    - Nhập điểm đi và điểm đến sau đó tìm: này phải query 5 bảng trừ bảng users, sau đó lọc theo where
*/
