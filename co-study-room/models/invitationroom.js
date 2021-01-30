'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvitationRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room);
    }
  };
  InvitationRoom.init({
    roomid: DataTypes.INTEGER,
    invitationurl: DataTypes.STRING,
    keyword: DataTypes.STRING,
    expiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'InvitationRoom',
  });
  return InvitationRoom;
};