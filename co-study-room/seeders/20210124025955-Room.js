'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      {
        id:1,
        roomname: 'test room',
        sammary: 'test room',
        startdate: new Date(),
        enddate: new Date(),
        bookid: 1,
        schduleid: 1,
        meeting: 'test',
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
