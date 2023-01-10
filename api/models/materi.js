const { Model } = require('sequelize');

const materiEntity = (sequelize, DataTypes) => {
  class Materi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Materi.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Materi',
  });
  return Materi;
};

module.exports = materiEntity;
