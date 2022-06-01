'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fromStation: {
        type: Sequelize.INTEGER, // type giống với type của khoá chính bên bảng 1
        references: {
          model: 'Stations', // tên bảng trong mysql
          key: 'id' // key muốn lên kết là khoá chính của bảng 1
        }
      },
      toStation: {
        type: Sequelize.INTEGER, // type giống với type của khoá chính bên bảng 1
        references: {
          model: 'Stations', // tên bảng trong mysql
          key: 'id' // key muốn lên kết là khoá chính của bảng 1
        }
      },
      startTime: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trips');
  }
};