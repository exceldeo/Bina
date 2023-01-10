const db = require('../models');
const { Op } = require("sequelize");

class MateriService {
  constructor() {
    this.userDB = db.sequelize.models.User;
    this.pendaftaranMateriDB = db.sequelize.models.PendaftaranMateri;
    this.materiDB = db.sequelize.models.Materi;
    this.subMateriDB = db.sequelize.models.SubMateri;
  }

  async getSubMateriByUmkmId({umkmId}) {

    let subMateris = [];

    const materis = await this.getMateriByUmkmId({umkmId : umkmId})

    for (const materi of materis) {

      const subMateri = await this.getSubMateriByMateriId({materiId: materi.id})
      subMateris = [...subMateris, ...subMateri] 
    }

    return subMateris;
  }

  
  async getMateriByUmkmId({umkmId}) {

    let materis = [];
    const pendaftaranMateris = await this.pendaftaranMateriDB.findAll({
      // attributes: subMateriDB,
      where:{
        userId: umkmId
      },
    });


    for (const pendaftaranMateri of pendaftaranMateris) {

      const materi = await this.materiDB.findOne({
        where: {
          id: pendaftaranMateri.materiId,
        }
      });

      materis.push(materi);
    }


    return materis;
  }

  async getSubMateriByMateriId({materiId}) {

    this.userDB.hasOne(this.subMateriDB, { foreignKey: 'id' });
    this.subMateriDB.belongsTo(this.userDB, { foreignKey: 'pementorId' });

    
    console.log("masuk materi")

    const subMateris = await this.subMateriDB.findAll({
      attributes: ['id','name','link','description','type'],
      where: {
        materiId: materiId,
      },
      include: [{
        attributes: ['name'],
        model: this.userDB,
        required: false
      }],
    });

    console.log("masuk materi")


    return subMateris;
  }
  
}

module.exports = MateriService;
