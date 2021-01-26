'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id:1,
        loginid: 'a',
        username: 'テストユーザ001',
        password: 'a'
      },
      {
        id:2,
        loginid: 'b',
        username: 'テストユーザ002',
        password: 'b'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, [{
      id:1
    }, {
      id:2
    }]);
  }
};
