const dotenv = require('dotenv');
const { Router, json } = require('express');
const express = require('express');
const { createServer } = require('http');
const socketio = require('socket.io');
const webpush = require("web-push");
const nodemailer = require("nodemailer")
const { authenticateSocketUser } = require('./middleware/authenticateUser');
const configureDatabaseConnection = require('./utils/configureDatabaseConnection');
const allRouters = require('./routers');
const cors = require('cors');
require('./auth/configurePassport');
const { addUser, removeUser, getUser, getUserInRoom, checkUserInRoom, getAllUser} = require ('./services/userSocket.js')
const ChatService = require('./services/chatService');
const UserService = require('./services/userService');

const chatService = new ChatService();
const userService = new UserService();

dotenv.config();
const PORT = Number(process.env.PORT) || 8000;


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS
  },

  // tls: {
  //   rejectUnauthorized: false,
  // }
})

async function main() {
  await configureDatabaseConnection();
  
  const app = express();

  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions));

  webpush.setVapidDetails(
    "mailto:test@test.com",
    process.env.WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
  );
  
  app.use('/uploads', express.static('uploads'))
  
  const server = createServer(app);
  const io = socketio(server, {
    cors: {
      origin: "*",
    }
  });

  const apiRouter = Router();
  const v1 = Router();

  app.use('/api', apiRouter);
  apiRouter.use('/v1', v1);

  v1.use(json());
  v1.use(allRouters);

  // io.use(authenticateSocketUser);

  io.on('connection', (socket) => {

    socket.on('join', async ({idUser, idRoom}, callback) => {
      // console.log(idUser, idRoom)
      const userJoin = await userService.getUserById(idUser)
      const {error, user} = addUser({id : idUser, name: userJoin.name, idRoom: idRoom});
      
      if(error) return callback(error);
      
      // socket.emit('message', {user: 'admin', text: `${user.name}, selamat datang di ruang ${room}`})
      // socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, bergabung dengan kami!`})
      socket.join(user.idRoom);

      io.to(user.idRoom).emit('roomData', {idRoom: user.idRoom, users: getUserInRoom(user.idRoom)})
      
      // console.log(`testing ${getAllUser().length}`);
      callback();
    })
  
    socket.on('sendMessage', async ({idUser, message, receiverUserId, type}, callback) => {
      const user = await getUser(idUser);

      const userSendNotif = await userService.getUserById(receiverUserId)
      // console.log(userSendNotif)

      // let mailOptions = {
      //   form : process.env.MAIL_EMAIL,
      //   to: userSendNotif.email,
      //   subject: "Notification From Bina",
      //   text: `You got a new message from ${user.nameUser}`
      // }

      // transporter.sendMail(mailOptions, function (err ,success){
      //   // console.log(success)
      //   // console.log(err)
      //   if(err){
      //     console.log(err)
      //   }
      //   else{
      //     console.log("Email send successfully")
      //   }
      // })
    
      const chat = await chatService.sendMessage({message: message, sendUserId: idUser, receiverUserId: receiverUserId, type: type});
      
      io.to(user.idRoom).emit('message', {message: message, sendUserId:idUser, receiverUserId: receiverUserId, type:type, createdAt: chat.createdAt });

      const payload = JSON.stringify({ title: "New Message", content: `From ${user.nameUser}` });

      webpush
        .sendNotification(JSON.parse(userSendNotif.authSubscribe), payload)
        .catch(err => console.error(err));

      callback({message: message, sendUserId:idUser, receiverUserId: receiverUserId , createdAt: chat.createdAt });
    })
    
    socket.on('disconnect', (idUser) => {
      const user = removeUser(idUser);
      
      // if(user) {
      //   io.to(user.room).emit('message', {user: 'admin', text: `${user.name} hilang.`})
      //   io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
      // }
    })
  });

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server is in ${process.env.NODE_ENV} mode`);
    // eslint-disable-next-line no-console
    console.log(`server started at http://localhost:${PORT}`);
  });
}
main();
