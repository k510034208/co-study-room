'use strict';
var tools = require('../modules/tools');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    loginid: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[A-Za-z0-9]+$/i,
          msg: 'Login IDは半角英数字で登録してください。'
        },
        len: {
          args: [1,32],
          msg: 'Login IDは32文字以内で登録してください。'
        }
      },
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};