import bcrypt from 'bcrypt'
import Promise from 'bluebird'

Promise.promisifyAll(bcrypt);

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        }
      }
    },
    recomendations: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    publicAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 2000],
          msg: 'Please enter a password with at least 3 characters'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Post);
    User.hasMany(models.Vote);
    User.hasMany(models.View);
    User.hasMany(models.Tag);
  };

  User.createUser = (newUser) => User.create(newUser);

  User.destroyUser = (username) => User.destroy({
    where: {username}
  })

  User.getUser = (username) => User.findOne({
    where: {username}
  })

  User.verifyPassword = (password, hashedPassword) => bcrypt.compareAsync(password, hashedPassword)

  User.verifyLogin = async (username, password) => {

    let user = await User.getUser(username);

    if (!user) {
      throw new Error('username does not exist');
    }

    const isMatch = await User.verifyPassword(password, user.password);

    if (!isMatch) {
      throw new Error('password is incorrect');
    }

    delete user.password;
    return user;
  }

  User.queryUsers = (query) => User.findAll({
    where: query,
    include: [{all: true}]
  });

  User.getAllPosts = () => User.findAll({
    include: [{all: true}]
  })

  User.addPublicAddress = (id, publicAddress) => {
    return User.update(
      {publicAddress},
      {where: {id}},
    )
  }

  User.addRecomendations = (id, recomendations) => {
    return User.update(
      {recomendations},
      {where: {id}},
    );
  };

  return User;
};
