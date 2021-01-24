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
<<<<<<< HEAD
      this.hasOne(models.RoomAcl);
=======
>>>>>>> parent of 8ff0415... assosiationが解決していない
    }
  };
  Room.init({
    roomname: DataTypes.STRING,
    sammary: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    bookid: DataTypes.INTEGER,
    schduleid: DataTypes.INTEGER,
<<<<<<< HEAD
    meeting: DataTypes.STRING,
=======
    meeting: DataTypes.STRING
>>>>>>> parent of 8ff0415... assosiationが解決していない
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};