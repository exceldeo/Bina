const { Model } = require('sequelize');

const pendaftaranMateriEntity = (sequelize, DataTypes) => {
  class PendaftaranMateri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  PendaftaranMateri.init({
    materiId: DataTypes.INTEGER,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'PendaftaranMateri',
  });
  return PendaftaranMateri;
};

module.exports = pendaftaranMateriEntity;
