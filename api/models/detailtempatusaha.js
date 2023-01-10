const { Model, DataTypes } = require('sequelize');

const detailTempatUsahaEntity = (sequelize) => {
  class DetailTempatUsaha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  DetailTempatUsaha.init({
    imageUrl: DataTypes.TEXT,
    detailUserId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'DetailTempatUsaha',
  });
  return DetailTempatUsaha;
};

module.exports = detailTempatUsahaEntity;
