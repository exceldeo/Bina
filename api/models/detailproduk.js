const { Model, DataTypes } = require('sequelize');

const detailProdukEntity = (sequelize) => {
  class DetailProduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  DetailProduk.init({
    imageUrl: DataTypes.TEXT,
    detailUserId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'DetailProduk',
  });
  return DetailProduk;
};

module.exports = detailProdukEntity;
