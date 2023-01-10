module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Users', [{
      name: 'Syeda',
      email: 'Syeda@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 1,
    }, {
      name: 'Fern',
      email: 'Fern@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 2,
    }, {
      name: 'Gabriella',
      email: 'Gabriella@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 3,
    }, {
      name: 'Troy',
      email: 'Troy@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 2,
    }, {
      name: 'Ana',
      email: 'Ana@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 3,
    }, {
      name: 'Khadija',
      email: 'Khadija@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 2,
    }, {
      name: 'Amelia',
      email: 'Amelia@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 3,
    }, {
      name: 'Victoria',
      email: 'Victoria@gmail.com',
      password: '$2b$10$/IS.My1sFT9QKrbjJpSzJOUyp9N0nxU6RgxNYw.WOIq5ohbV1AdAe',
      phoneNumber: '0',
      role: 3,
    }], {});

    await queryInterface.bulkInsert('Mentorings', [{
      umkmUserId: 3,
      mentorUserId: 2,
    },
    {
      umkmUserId: 5,
      mentorUserId: 4,
    },
    {
      umkmUserId: 7,
      mentorUserId: 6,
    },
    {
      umkmUserId: 8,
      mentorUserId: 6,
    }], {});

    await queryInterface.bulkInsert('DetailUsers', [{
      namaLengkap: 'Gabriella',
      badanHukum: 'PT',
      lamaUsaha: 5,
      kepemilikanTempatUsaha: 'Milik Sendiri',
      kategoriUsaha: 'Perdagangan',
      lokasiUsaha: 'Surabaya',
      produk: 'lele goreng',
      namaProduk: 'legr',
      channelPenjualan: '{"online": [], "offline": [] }',
      jumlahPegawai: 2,
      pendapatanPerbulan: 5000000,
      teleponKantor: 123456,
      websiteUsaha: 'keripik.com',
      jumlahPemilikUsaha: 1,
      kepemilikanSaham: 'Gabriella',
      kendaraanOperasional: 1,
      statusPernikahan: 'Belum',
      kartuKeluarga: '0123456',
      aktePerusahaan: '0123456',
      NIB: '0123444',
      npwpPerusahaan: '0123',
      userId: 3,
    }, {
      namaLengkap: 'Ananta',
      badanHukum: 'Koperasi',
      lamaUsaha: 1,
      kepemilikanTempatUsaha: 'Milik Sendiri',
      kategoriUsaha: 'Industri Pengolahan',
      lokasiUsaha: 'Surabaya',
      produk: 'batik',
      namaProduk: 'btik',
      channelPenjualan: '{"online": [], "offline": [] }',
      jumlahPegawai: 2,
      pendapatanPerbulan: 100000,
      teleponKantor: 123456,
      websiteUsaha: 'fashion.com',
      jumlahPemilikUsaha: 1,
      kepemilikanSaham: 'Ananta',
      kendaraanOperasional: 0,
      statusPernikahan: 'Belum',
      kartuKeluarga: '0123456',
      aktePerusahaan: '0123456',
      NIB: '0123444',
      npwpPerusahaan: '0123',
      userId: 5,
    }, {
      namaLengkap: 'Amelia A',
      badanHukum: 'PT',
      lamaUsaha: 10,
      kepemilikanTempatUsaha: 'Milik Sendiri',
      kategoriUsaha: 'Jasa',
      lokasiUsaha: 'Surabaya',
      produk: 'potato chip',
      namaProduk: 'pochip',
      channelPenjualan: '{"online": [], "offline": [] }',
      jumlahPegawai: 2,
      pendapatanPerbulan: 5000000,
      teleponKantor: 123456,
      websiteUsaha: 'kentang.com',
      jumlahPemilikUsaha: 1,
      kepemilikanSaham: 'Gabriella',
      kendaraanOperasional: 1,
      statusPernikahan: 'Belum',
      kartuKeluarga: '0123456',
      aktePerusahaan: '0123456',
      NIB: '0123444',
      npwpPerusahaan: '0123',
      userId: 7,
    }, {
      namaLengkap: 'Victoria A',
      badanHukum: 'NA',
      lamaUsaha: 0,
      kepemilikanTempatUsaha: 'Sewa',
      kategoriUsaha: 'Kuliner',
      lokasiUsaha: 'Surabaya',
      produk: 'biskuit',
      namaProduk: 'beng beng',
      channelPenjualan: '{"online": [], "offline": [] }',
      jumlahPegawai: 2,
      pendapatanPerbulan: 100000,
      teleponKantor: 123456,
      websiteUsaha: '',
      jumlahPemilikUsaha: 1,
      kepemilikanSaham: 'Victoria',
      kendaraanOperasional: 1,
      statusPernikahan: 'Belum',
      kartuKeluarga: '0123456',
      aktePerusahaan: '0123456',
      NIB: '0123444',
      npwpPerusahaan: '0123',
      userId: 8,
    }], {});

    await queryInterface.bulkInsert('Chats', [{
      sendUserId: 2,
      receiverUserId: 3,
      message: 'halo selamat pagi',
      type: 1,
    },
    {
      sendUserId: 4,
      receiverUserId: 5,
      message: 'halo selamat siang',
      type: 1,
    },
    {
      sendUserId: 6,
      receiverUserId: 7,
      message: 'halo selamat pagi',
      type: 1,
    },
    {
      sendUserId: 6,
      receiverUserId: 8,
      message: 'halo selamat malam',
      type: 1,
    }], {});

    await queryInterface.bulkInsert('DetailProduks', [{
      imageUrl: 'ada',
      detailUserId: 1,
    },
    {
      imageUrl: 'ada',
      detailUserId: 2,
    }], {});

    await queryInterface.bulkInsert('DetailTempatUsahas', [{
      imageUrl: 'ada',
      detailUserId: 1,
    },
    {
      imageUrl: 'ada',
      detailUserId: 3,
    }], {});
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Mentorings', null, {});
    await queryInterface.bulkDelete('DetailUsers', null, {});
    await queryInterface.bulkDelete('Chats', null, {});
    await queryInterface.bulkDelete('DetailProduks', null, {});
    await queryInterface.bulkDelete('DetailTempatUsahas', null, {});
  },
};
