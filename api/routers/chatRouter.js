const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { OK } = require('http-status-codes').StatusCodes;
const ChatService = require('../services/chatService');
const multer  = require('multer');


const chatRouter = Router();
const chatService = new ChatService();

const { getAllUser } = require ('../services/userSocket.js')


//// jika ingin menyimpan file di upload
const storage = multer.diskStorage(
  {
    destination: './uploads/',
    filename: function ( req, file, cb ) {
      let extArray = file.originalname.split(".");
      let extension = extArray[extArray.length - 1];
      cb( null, Date.now() + "." + extension);
    }
  }
);

// limit 100 kb
const upload = multer({
  storage : storage,
  // limits: {fileSize : 100000}
})

chatRouter.get(
  '/listlastchatmentor/:idMentor',
  asyncHandler(async (req, res) => {
    const { idMentor } = req.params;
    const data = await chatService.getListLastChatByMentorId({mentorId : idMentor});
    res.status(OK).send(data);
  }),
);

chatRouter.get(
  '/:sendUserId/:receiverUserId',
  asyncHandler(async (req, res) => {
    const sendUserId = req.params.sendUserId;
    const receiverUserId = req.params.receiverUserId;
    const messages = await chatService.getChatByUserIdAndMentorId({receiverUserId: receiverUserId, sendUserId: sendUserId});
    res.status(OK).send(messages);
  }),
);

chatRouter.post(
    '/send/:sendUserId/:receiverUserId',
    asyncHandler(async (req, res) => {
      const sendUserId = req.params.sendUserId;
      const receiverUserId = req.params.receiverUserId;
      const message = req.body.message;
      const messages = await chatService.sendMessage({message:message ,receiverUserId: receiverUserId, sendUserId: sendUserId});
      res.status(OK).send(messages);
    }),
  );

  chatRouter.get(
    '/getAllUser',
    asyncHandler(async (req, res) => {
      
      res.status(OK).send(getAllUser());
    }),
  );

  chatRouter.post(
    '/uploadImage/:sendUserId/:receiverUserId', upload.single('image'),
    asyncHandler(async (req, res) => {
      const sendUserId = req.params.sendUserId;
      const receiverUserId = req.params.receiverUserId;
      const data = {
        'message': req.file.filename,
        'type': '2'
      }
      // const chat = await chatService.sendMessage({message: req.file.filename, receiverUserId: receiverUserId, sendUserId: sendUserId, type: '2'});
      res.status(OK).send(data);
    }),
  );

  chatRouter.post(
    '/uploadFile/:sendUserId/:receiverUserId', upload.single('file'),
    asyncHandler(async (req, res) => {
      const sendUserId = req.params.sendUserId;
      const receiverUserId = req.params.receiverUserId;
      const data = {
        'message': req.file.filename,
        'type': '3'
      }
      // const chat = await chatService.sendMessage({message: req.file.filename, receiverUserId: receiverUserId, sendUserId: sendUserId, type: '3'});
      res.status(OK).send(data);
    }),
  );

module.exports = chatRouter;