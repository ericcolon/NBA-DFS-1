'use strict';

const voteTypeData = require('../seed/6-vote-type');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VoteTypes', voteTypeData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VoteTypes', null, {});
  }
};