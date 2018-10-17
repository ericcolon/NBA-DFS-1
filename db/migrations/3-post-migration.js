module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      PostTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      viewCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      answerCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      isTopAnswer: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      commentCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      favoriteCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      upvoteCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      closedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      bounty: {
        defaultValue: 0,
        type: Sequelize.FLOAT
      }
    });
  },
  down: (queryInterface, /*Sequelize*/) => {
    return queryInterface.dropTable('Posts');
  }
};
