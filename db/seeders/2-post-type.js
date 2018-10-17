'use strict';

const postTypeData = require('../seed/2-post-type');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PostTypes', postTypeData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostTypes', null, {});
  }
};