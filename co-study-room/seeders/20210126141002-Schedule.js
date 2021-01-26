'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schedules', [
      {
        id: 1,
        term:1,
        roomid: 1,
        term_end_date: new Date(2021,0,31,0,0,0),
        term_content: '第1章～第３章',
        term_task: ''
      },
      {
        id: 2,
        term:2,
        roomid: 1,
        term_end_date: new Date(2021,1,14,0,0,0),
        term_content: '第４章',
        term_task: ''
      },
      {
        id: 3,
        term: 3,
        roomid: 1,
        term_end_date: new Date(2021,1,28,0,0,0),
        term_content: '第５章',
        term_task: ''
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Schedules', null,[{
      id: 1,
    }, {
      id:2
      }, {
      id:3
    }]
);
  }
};