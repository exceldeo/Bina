const { UserNotFound } = require('../errors/ResourceError');
const { ClassificationUser } = require('../utils/userClasification');
const db = require('../models');
class UserService {
  constructor() {
    this.userDB = db.sequelize.models.User;
    this.mentoringDB = db.sequelize.models.Mentoring;
    this.detailUserDB = db.sequelize.models.DetailUser;
    this.detailProdukDB = db.sequelize.models.DetailProduk 
    this.detailTempatUsahaDB = db.sequelize.models.DetailTempatUsaha 
  }

  async getUserById(userId) {
    const user = await this.userDB.findOne({
      attributes: ['id', 'name','email','phoneNumber','role','authSubscribe'],
      where: {
        id: userId,
      },
    });

    if (!user) {
      UserNotFound();
    }

    return user;
  }

  async getDetailUmkm(idUmkm) {
    this.userDB.hasOne(this.detailUserDB, { foreignKey: 'userId' });
    this.detailUserDB.belongsTo(this.userDB, { foreignKey: 'id' });

    this.detailUserDB.hasMany(this.detailProdukDB, { foreignKey: 'detailUserId' });
    this.detailProdukDB.belongsTo(this.detailUserDB, { foreignKey: 'id' });

    this.detailUserDB.hasMany(this.detailTempatUsahaDB, { foreignKey: 'detailUserId' });
    this.detailTempatUsahaDB.belongsTo(this.detailUserDB, { foreignKey: 'id' });

    const mentor = await this.getUmkmMentoringByIdUmkm(idUmkm);

    const users = await this.userDB.findOne({
      attributes: ['id', 'name','email','phoneNumber','role'],
      where: {
        id: idUmkm,
        role: 3,
      },
      include: [{
        model: this.detailUserDB,
        required: true,
        include: [{
          model: this.detailProdukDB,
          required: false
        },{
          model: this.detailTempatUsahaDB,
          required: false
        }],
      }],
    });

    if (!users) {
      UserNotFound();
    }

    const user = ClassificationUser(users);
    // console.log(mentor)
    user.dataValues.mentorId = mentor.id;
    user.dataValues.mentorName = mentor.name;
    user.dataValues.mentorDeskripsi = mentor.deskripsi;
    user.dataValues.mentorFoto = mentor.foto;

    return user;
  }

  async getMentor(id) {
    const user = await this.userDB.findOne({
      attributes: ['id', 'name','email','phoneNumber','role', 'foto', 'deskripsi'],
      where: {
        id,
        role: 2,
      },
    });

    if (!user) {
      UserNotFound();
    }

    return user;
  }

  async getUmkmMentoringByIdMentor(id) {
    const allUser = [];

    const mentorings = await this.mentoringDB.findAll({
      where: {
        mentorUserId: id,
      },
    });

    this.userDB.hasOne(this.detailUserDB, { foreignKey: 'userId' });
    this.detailUserDB.belongsTo(this.userDB, { foreignKey: 'id' });

    this.detailUserDB.hasMany(this.detailProdukDB, { foreignKey: 'detailUserId' });
    this.detailProdukDB.belongsTo(this.detailUserDB, { foreignKey: 'id' });

    this.detailUserDB.hasMany(this.detailTempatUsahaDB, { foreignKey: 'detailUserId' });
    this.detailTempatUsahaDB.belongsTo(this.detailUserDB, { foreignKey: 'id' });

    for (const mentoring of mentorings) {
      const users = await this.userDB.findOne({
        attributes: ['id', 'name','email','phoneNumber','role'],
        where: {
          id: mentoring.umkmUserId,
        },
        include: [{
          model: this.detailUserDB,
          required: true,
          include: [{
            model: this.detailProdukDB,
            required: false
          },{
            model: this.detailTempatUsahaDB,
            required: false
          }],
        }],
      });
      
      const user = ClassificationUser(users);

      allUser.push(user);
    }

    if (allUser.length === 0 ) {
      UserNotFound();
    }

    return allUser;
  }

  async getUmkmMentoringByIdUmkm(id) {

    const mentorings = await this.mentoringDB.findOne({
      where: {
        umkmUserId: id,
      },
    });

    const user = await this.userDB.findOne({
      attributes: ['id', 'name','email','phoneNumber', 'foto', 'deskripsi'],
      where: {
        id: mentorings.mentorUserId,
      },
    });

    if (!user) {
      UserNotFound();
    }

    return user;
  }

  async uploadFotoProdukByIdUmkm({id, base64}) {

    // console.log(id)

    const detailUser = await this.detailUserDB.findOne({
      where: {
        userId: id,
      },
    });

    // console.log(user.id)
    // console.log(base64)

    const newDetailProduk = await this.detailProdukDB.create({
      imageUrl: base64,
      detailUserId: detailUser.id,
    });


    return newDetailProduk;
  }

  async uploadFotoTempatByIdUmkm({id, base64}) {

    const detailUser = await this.detailUserDB.findOne({
      attributes: ['id'],
      where: {
        userId: id,
      },
    });

    const newDetailTempatUsaha = await this.detailTempatUsahaDB.create({
      imageUrl: base64,
      detailUserId: detailUser.id,
    });


    return newDetailTempatUsaha;
  }

  async updateUserById({userId, data}) {
  
    const user = await this.userDB.update(data, {
      where: {
        id: userId,
      }
    }).then(result =>
      console.log(result)
    )
    .catch(err =>
      console.log(err)
    );
    // console.log(user)


    return user;
  }

  async getUmkmMentoringDataByIdMentor({mentorId}) {

    // console.log(mentorId)

    const mentorings = await this.mentoringDB.findAll({
      where: {
        mentorUserId: mentorId,
      },
    });

    return mentorings;
  }
}

module.exports = UserService;
