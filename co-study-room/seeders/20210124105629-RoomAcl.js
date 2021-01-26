'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RoomAcls', [
      {
        id:1,
        roomid : 1,
        userid: 1,
      },
      {
        id:2,
        roomid : 1,
        userid: 2,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RoomAcls', null, [{
      id: 1
    },
      {
        id: 2
      }
    ]);
  }
};
