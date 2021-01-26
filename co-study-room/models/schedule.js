'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room);
    }
  };
  Schedule.init({
    term: DataTypes.INTEGER,
    roomid: DataTypes.INTEGER,
    term_end_date: DataTypes.DATE,
    term_content: DataTypes.STRING,
    term_task: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};