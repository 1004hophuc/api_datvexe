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
      'users',
      [
        {
          name: 'Nguyễn Văn Bảo',
          email: "nguyenvanbao@gmail.com",
          password: "123456",
          numberPhone: "0904000123",
          avatar: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=100&q=80",
          type: "ADMIN",
          createdAt: "2022-05-28 09:02:04",
          updatedAt: "2022-05-28 13:41:21"
        },
        {
          name: 'Hồ Văn Phúc',
          email: "hophuc1004@gmail.com",
          password: "123456",
          numberPhone: "0904000123",
          avatar: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=100&q=80",
          type: "ADMIN",
          createdAt: "2022-05-28 09:02:04",
          updatedAt: "2022-05-28 13:41:21"
        },
        {
          name: 'Nguyễn Thanh Phương',
          email: "nguyenthanhphuong@gmail.com",
          password: "123456",
          numberPhone: "0904000123",
          avatar: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=100&q=80",
          type: "ADMIN",
          createdAt: "2022-05-28 09:02:04",
          updatedAt: "2022-05-28 13:41:21"
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
