const { Model, DataTypes } = require('sequelize');
const hashPassword = require('../utils/hashPassword');

const userEntity = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.INTEGER,
    foto: DataTypes.TEXT,
    deskripsi: DataTypes.TEXT,
    authSubscribe: DataTypes.TEXT,
  }, {
    hooks: {
      beforeCreate: async (atttributes) => {
        if (atttributes.password) {
          // eslint-disable-next-line no-param-reassign
          atttributes.password = await hashPassword(atttributes.password);
        }
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};

module.exports = userEntity;
