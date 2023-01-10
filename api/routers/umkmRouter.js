const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const UserService = require('../services/userService');
const multer  = require('multer');

const umkmRouter = Router();
const userService = new UserService();

//// jika ingin menyimpan file di upload
// const storage = multer.diskStorage(
//   {
//     destination: './uploads/',
//     filename: function ( req, file, cb ) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb( null, Date.now() + "." + extension);
//     }
//   }
// );

// limit 100 kb
const upload = multer({
  // storage : storage,
  limits: {fileSize : 100000}
})

umkmRouter.get(
  '/getMentor/:idUmkm',
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;
    const user = await userService.getUmkmMentoringByIdUmkm(idUmkm);
    res.status(OK).send(user);
  }),
);

umkmRouter.get(
  '/:idUmkm',
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;
    const user = await userService.getDetailUmkm(idUmkm);
    res.status(OK).send(user);
  }),
);

umkmRouter.post(
  '/upload_tempat/:idUmkm', upload.single('image'),
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;

    let encoded = req.file
    let base64File = `data:${encoded.mimetype};base64,${encoded.buffer.toString('base64')}`
    
    const detailTempatUsaha = await userService.uploadFotoTempatByIdUmkm({id:idUmkm , base64: base64File});
    
    res.status(OK).send(detailTempatUsaha);
  }),
);

umkmRouter.post(
  '/upload_produk/:idUmkm', upload.single('image'),
  asyncHandler(async (req, res) => {
    const { idUmkm } = req.params;

    let encoded = req.file
    let base64File = `data:${encoded.mimetype};base64,${encoded.buffer.toString('base64')}`
    
    const detailProduk = await userService.uploadFotoProdukByIdUmkm({id:idUmkm , base64: base64File});
    
    res.status(OK).send(detailProduk);
  }),
);



module.exports = umkmRouter;
