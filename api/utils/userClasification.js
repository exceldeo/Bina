
const ClassificationUser = (data) => {
    let point = 0

    //cek badan hukum
    if(data.DetailUser.badanHukum == "PT"){
      point = point + 5
    }else if(data.DetailUser.badanHukum == "Koperasi"){
      point = point + 4
    }else if(data.DetailUser.badanHukum == "CV"){
      point = point + 3
    }else{
      point = point + 1
    }

    //cek lama usaha
    if(data.DetailUser.lamaUsaha > 3){
      point = point + 5
    }else if(data.DetailUser.lamaUsaha >= 2){
      point = point + 3
    }else if(data.DetailUser.lamaUsaha >= 1){
      point = point + 2
    }else{
      point = point + 1
    }

    //cek kepemilikan tempat usaha
    if(data.DetailUser.kepemilikanTempatUsaha == "Milik Sendiri"){
      point = point + 5
    }else{
      point = point + 3
    }

    //TODO cek channel usaha
    // const channelP = JSON.parse(data.DetailUser.channelPenjualan)

    // if(channelP.online.length > 0 && channelP.offline.length > 0){
    //   point = point + 5
    // }else{
    //   point = point + 3
    // }

    //cek Jumlah pegawai
    if(data.DetailUser.jumlahPegawai > 100){
      point = point + 5
    }else if(data.DetailUser.jumlahPegawai >= 20){
      point = point + 4
    }else{
      point = point + 3
    }

    //cek Website Usaha
    if(data.DetailUser.websiteUsaha != null && data.DetailUser.websiteUsaha != '' ){
      point = point + 5
    }else{
      point = point + 1
    }

    //cek Foto Tempat Usaha
    if( data.DetailUser.DetailTempatUsaha != null ){
      point = point + 5
    }else{
      point = point + 1
    }
    
    //cek Foto Produk Usaha
    if( data.DetailUser.DetailProduk != null ){
      point = point + 5
    }else{
      point = point + 1
    }

    if(point > 85){
      data.dataValues.labelPoint = 'Gold'
    }else if(point >= 70){
      data.dataValues.labelPoint = 'Silver'
    }else if(point >= 50){
      data.dataValues.labelPoint = 'Bronze'
    }else{
      data.dataValues.labelPoint = 'Orange'
    }

    return data
  };

module.exports = {ClassificationUser};