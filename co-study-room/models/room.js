'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.RoomAcl);
    }
  };
  Room.init({
    roomname: DataTypes.STRING,
    sammary: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    bookid: DataTypes.INTEGER,
    schduleid: DataTypes.INTEGER,
    meeting: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};