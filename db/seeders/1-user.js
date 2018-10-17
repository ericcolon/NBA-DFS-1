'use strict';

const bcrypt = require('bcrypt');

const userData = require('../seed/1-user');

module.exports = {
  
  up: (queryInterface, Sequelize) => {
    for(const user of userData) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
    
    return queryInterface.bulkInsert('Users', userData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
