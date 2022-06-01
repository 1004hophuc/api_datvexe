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
      'trips',
      [
        {
          fromStation: 1,
          toStation: 2,
          startTime: "2022-05-28 08:15:41",
          price: 200000,
          createdAt: "2022-06-01 04:14:02",
          updatedAt: "2022-06-01 04:14:02"
        },
        {
          fromStation: 3,
          toStation: 4,
          startTime: "2022-05-28 08:15:41",
          price: 170000,
          createdAt: "2022-06-01 04:14:02",
          updatedAt: "2022-06-01 04:14:02"
        },
        {
          fromStation: 1,
          toStation: 3,
          startTime: "2022-05-28 08:15:41",
          price: 150000,
          createdAt: "2022-06-01 04:14:02",
          updatedAt: "2022-06-01 04:14:02"
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
    await queryInterface.bulkDelete('trips', null, {});
  }
};
