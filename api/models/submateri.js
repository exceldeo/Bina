const { Model } = require('sequelize');

const subMateriEntity = (sequelize, DataTypes) => {
  class SubMateri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  SubMateri.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    materiId: DataTypes.UUID,
    pementorId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'SubMateri',
  });
  return SubMateri;
};

module.exports = subMateriEntity;
