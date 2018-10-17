'use strict';

const voteData = require('../seed/7-vote');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Votes', voteData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Votes', null, {});
  }
};