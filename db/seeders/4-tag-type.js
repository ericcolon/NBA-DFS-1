'use strict';

const tagData = require('../seed/4-tag-type');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TagTypes', tagData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TagTypes', null, {});
  }
};