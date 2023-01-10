const { Model, DataTypes } = require('sequelize');

const chatEntity = (sequelize) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Chat.init({
    message: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    receiverUserId: DataTypes.INTEGER,
    sendUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};

module.exports = chatEntity;
