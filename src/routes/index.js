import messageRouter from '../components/message/network.js';
import userRouter from '../components/user/network.js'
import chatRouter from '../components/chat/network.js';

import { Router } from 'express';

export default (app) => {
  const router = Router();

  app.use('/api/v1', router)

  router.use('/message', messageRouter)
  router.use('/user', userRouter)
  router.use('/chat', chatRouter)
}
