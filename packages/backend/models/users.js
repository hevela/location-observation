'use strict';
const bcrypt = require('bcrypt');

const saltRounds = 8;
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      generateHash(password) {
        return hash(password, bcrypt.genSaltSync(saltRounds));
      },
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
  };
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return Users;
};