const { Model } = require('sequelize');

const detailUserEntity = (sequelize, DataTypes) => {
  class DetailUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  DetailUser.init({
    namaLengkap: DataTypes.STRING,
    badanHukum: DataTypes.STRING,
    lamaUsaha: DataTypes.INTEGER,
    kepemilikanTempatUsaha: DataTypes.STRING,
    kategoriUsaha: DataTypes.STRING,
    lokasiUsaha: DataTypes.STRING,
    produk: DataTypes.TEXT,
    namaProduk: DataTypes.STRING,
    channelPenjualan: DataTypes.TEXT,
    jumlahPegawai: DataTypes.INTEGER,
    pendapatanPerbulan: DataTypes.INTEGER,
    teleponKantor: DataTypes.STRING,
    websiteUsaha: DataTypes.STRING,
    jumlahPemilikUsaha: DataTypes.INTEGER,
    kepemilikanSaham: DataTypes.STRING,
    kendaraanOperasional: DataTypes.INTEGER,
    statusPernikahan: DataTypes.STRING,
    kartuKeluarga: DataTypes.STRING,
    aktePerusahaan: DataTypes.STRING,
    NIB: DataTypes.STRING,
    npwpPerusahaan: DataTypes.STRING,
    kelompok: DataTypes.STRING,
    userId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'DetailUser',
  });
  return DetailUser;
};

module.exports = detailUserEntity;
