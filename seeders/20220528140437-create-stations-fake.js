'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'stations',
      [
        {
          "name": "Bến Xe Miền Tây",
          "address": "395 Kinh Dương Vương, An Lạc, Bình Tân, Thành Phố Hồ Chí Minh",
          "province": "HCM",
          "createdAt": "2022-05-28 08:15:41",
          "updatedAt": "2022-05-28 08:15:41"
        },
        {
          "name": "Bến Xe Long Xuyên",
          "address": "395 Kinh Dương Vương, An Lạc, Bình Tân, Tỉnh An Giang",
          "province": "HN",
          "createdAt": "2022-05-28 08:36:28",
          "updatedAt": "2022-05-28 08:36:28"
        },
        {
          "name": "Bến Xe Nha Trang",
          "address": "395 Nha Trang, Hoà Minh, Liên Chiểu, Nha Trang",
          "province": "HCM",
          "createdAt": "2022-05-28 09:02:04",
          "updatedAt": "2022-05-28 13:41:21"
        },
        {
          "name": "Bến Xe Đà Nẵng",
          "address": "Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng",
          "province": "Đà Nẵng",
          "createdAt": "2022-05-28 09:15:36",
          "updatedAt": "2022-05-28 09:50:01"
        }
      ], {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('stations', null, {});
  }
};
