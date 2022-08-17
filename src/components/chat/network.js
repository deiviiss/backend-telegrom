import { Router } from 'express';
import { success, error } from '../../network/response.js';

import { addChat, listChats } from './controller.js'

const router = Router();

router.post('/', (req, res) => {

  addChat(req.body.users)
    .then((data) => {
      success(req, res, data, 201)
    })
    .catch(e => {
      error(req, res, 'Error interno', 500, e)
    })
})

router.get('/', (req, res) => {

  const userId = req.query.userId || null;

  listChats(userId)
    .then((data) => {
      success(req, res, data, 201)
    })
    .catch(
      e => {
        error(req, res, 'Invalid information', 400, e)
      }
    )
})

export default router;
