module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailTempatUsahas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      detailUserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'DetailUsers',
          key: 'id',
          as: 'detailUserId',
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
    await queryInterface.dropTable('DetailTempatUsahas');
  },
};
