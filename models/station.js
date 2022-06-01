'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip }) {
      // define association here
      // hàm liên kết giữa các table (model) lại với nhau
      this.hasMany(Trip, { foreignKey: "fromStation", as: "from" });
      this.hasMany(Trip, { foreignKey: "toStation", as: "to" });
    }
  }
  Station.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 10]
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        checkLen(value) {
          if (value.length > 5 && value.length < 20) {
            return true;
          } else {
            throw new Error("Độ dài phải từ 5 - 20 ký tự");
          }
        },
      },
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["HCM", "HN", "Đà Nẵng", "Nha Trang"]],
      }
    }
  }, {
    sequelize,
    modelName: 'Station',
  });
  return Station;
};