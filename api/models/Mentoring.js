const { Model } = require('sequelize');

const mentoringEntity = (sequelize, DataTypes) => {
  class Mentoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Mentoring.init({
    umkmUserId: DataTypes.INTEGER,
    mentorUserId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Mentoring',
  });
  return Mentoring;
};

module.exports = mentoringEntity;
