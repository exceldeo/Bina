module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaLengkap: {
        type: Sequelize.STRING,
      },
      badanHukum: {
        type: Sequelize.STRING,
      },
      lamaUsaha: {
        type: Sequelize.INTEGER,
      },
      kepemilikanTempatUsaha: {
        type: Sequelize.STRING,
      },
      kategoriUsaha: {
        type: Sequelize.STRING,
      },
      lokasiUsaha: {
        type: Sequelize.STRING,
      },
      produk: {
        type: Sequelize.TEXT,
      },
      namaProduk: {
        type: Sequelize.STRING,
      },
      channelPenjualan: {
        type: Sequelize.TEXT,
      },
      jumlahPegawai: {
        type: Sequelize.INTEGER,
      },
      pendapatanPerbulan: {
        type: Sequelize.INTEGER,
      },
      teleponKantor: {
        type: Sequelize.STRING,
      },
      websiteUsaha: {
        type: Sequelize.STRING,
      },
      jumlahPemilikUsaha: {
        type: Sequelize.INTEGER,
      },
      kepemilikanSaham: {
        type: Sequelize.STRING,
      },
      kendaraanOperasional: {
        type: Sequelize.INTEGER,
      },
      statusPernikahan: {
        type: Sequelize.STRING,
      },
      kartuKeluarga: {
        type: Sequelize.STRING,
      },
      aktePerusahaan: {
        type: Sequelize.STRING,
      },
      NIB: {
        type: Sequelize.STRING,
      },
      npwpPerusahaan: {
        type: Sequelize.STRING,
      },
      kelompok: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetailUsers');
  },
};
