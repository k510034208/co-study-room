'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      {
        id:1,
        roomname: 'test room',
        sammary: 'test room',
        startdate: new Date(2021,0,1,0,0,0),
        enddate: new Date(2021,1,28,0,0,0),
        bookid: 1,
        meeting: 'test',
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {
      id:1
    });  }
};
