const { Router } = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const mentorRouter = require('./mentorRouter');
const chatRouter = require('./chatRouter');
const umkmRouter = require('./umkmRouter');
const subscribeRouter = require('./subscribeRouter');
const materiRouter = require('./materiRouter');
const noRouterFound = require('./noRouterFound');
const errorHandler = require('../middleware/errorHandler');

const routers = Router();

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/mentors', mentorRouter);
routers.use('/chat', chatRouter);
routers.use('/umkm', umkmRouter);
routers.use('/subscribe', subscribeRouter);
routers.use('/materi', materiRouter);
routers.use('/', noRouterFound);
routers.use(errorHandler);

module.exports = routers;
