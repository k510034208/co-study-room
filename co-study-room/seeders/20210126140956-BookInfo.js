'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BookInfos', [
      {
        id : 1,
        booktitle: 'test book titele',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BookInfos', null,{
        id : 1,
    },
);
  }
};