'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
// sau khi nối đường dẫn = dirname với file (file ở đây chính là cái model) thì chúng ta sẽ có đường dẫn đi trực tiếp đến model này
// các file này đều sẽ export ra 1 function đối với mỗi model, nó sẽ truyền vào 2 tham số là sequelize và Sequelize.DataTypes
// sau khi nhận được được hàm với 2 tham số thì nó sẽ lưu vào object db
// sau đó từ object db nó sẽ lưu vào modelName và nó sẽ return về model đó

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// Từ line 18 đến line 36 mục đích chỉ là khi chúng ta tạo 1 model, nó sẽ tự động export 1 cái model đó cho chúng ta dùng.

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
