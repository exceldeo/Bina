const db = require('../models');
const { Op } = require("sequelize");
const UserService = require('./userService');

const userService = new UserService();

class ChatService {
  constructor() {
    this.chatDB = db.sequelize.models.Chat;
  }

  async getChatByUserIdAndMentorId({sendUserId, receiverUserId}) {
    const messages = await this.chatDB.findAll({
      attributes: ['message', 'type','receiverUserId','sendUserId','createdAt'],
      where:{[Op.or]: [
        {
          sendUserId: sendUserId,
          receiverUserId: receiverUserId
        },
        {
            sendUserId: receiverUserId,
            receiverUserId: sendUserId
        },
      ]},
      order: [
        ['createdAt', 'ASC'],
      ]
    });

    return messages;
  }

  async sendMessage({message, sendUserId, receiverUserId, type = '1'}) {

    const messages = await this.chatDB.create({
        message: message,
        type: type,
        sendUserId: sendUserId,
        receiverUserId: receiverUserId
      });
  
      return messages;
  }

  async getListLastChatByMentorId({mentorId}) {

    let allData = [];

    // console.log(`getListLastChatByMentorId`)

    const dataUsers = await userService.getUmkmMentoringDataByIdMentor({mentorId : mentorId})

    for (const dataUser of dataUsers) {
      const user = await userService.getUserById(dataUser.umkmUserId)

      const messages = await this.getLastMessageByIdUser({sendUserId:mentorId, receiverUserId: user.id})

      if(messages != null){

        // console.log(messages)
        messages.dataValues.umkmId = user.id;
        messages.dataValues.umkmName = user.name;
        messages.dataValues.mentorId = mentorId;
        
        allData.push(messages);
      }

    }

    return allData;
  }

  async getLastMessageByIdUser({sendUserId, receiverUserId }){

    // console.log(`getLastMessageByIdUser`)

    const messages = await this.chatDB.findOne({
      attributes: ['message', 'type','receiverUserId','sendUserId','createdAt'],
      where:{[Op.or]: [
        {
          sendUserId: sendUserId,
          receiverUserId: receiverUserId
        },
        {
            sendUserId: receiverUserId,
            receiverUserId: sendUserId
        },
      ]},
      order: [
        ['createdAt', 'DESC'],
      ]
    });

    return messages
  }

  
}

module.exports = ChatService;
