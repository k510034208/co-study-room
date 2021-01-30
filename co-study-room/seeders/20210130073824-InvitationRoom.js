'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schedules', [
      {
        id: 1,
        roomid: 1,
        invitationurl: 'xxxxxxxxxxxxx',
        keyword: 'keyword',
        expiration: new Date(2021, 12, 31, 0, 0, 0),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schedules', null,[{
      id: 1,
    },
    ]);
  }
};