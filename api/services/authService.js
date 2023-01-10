const jwt = require('jsonwebtoken');
const { EmailExistError } = require('../errors/ResourceError');
const db = require('../models');
const USER_ROLE = require('../utils/userRole');

class AuthService {
  constructor() {
    this.userDB = db.sequelize.models.User;
    this.jwt = jwt;
  }

  async createAuthUserData(user) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role == 1? 'Admin' : user.role == 2 ? 'Mentor' : 'UMKM' 
    };
    const token = this.generateAuthToken(payload);
    payload.token = token;
    return payload;
  }

  generateAuthToken(payload) {
    return this.jwt.sign({
      user: payload,
    }, process.env.SECRET_JWT, 
    { expiresIn: '365d' });
  }

  async registerNewUser(userData) {
    const isAvailable = await this.checkIsEmailAvailable(userData.email);

    if (!isAvailable) {
      EmailExistError();
    }

    const newUser = await this.userDB.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      role: userData.role? userData.role : "3",
    });

    return newUser;
  }

  async checkIsEmailAvailable(email) {
    const user = await this.userDB.findOne({
      where: {
        email,
      },
    });

    return !user;
  }
}

module.exports = AuthService;
