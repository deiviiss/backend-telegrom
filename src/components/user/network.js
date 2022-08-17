import { Router } from 'express';
import { success, error } from '../../network/response.js'; // server response

import { addUser, updateUser, deleteUser, listUsers } from './controller.js'

const router = Router();

router.get('/', (req, res) => {
  listUsers()
    .then((users) => {
      // response from response.js
      success(req, res, users, 201)
    })
    .catch(
      (e) => {
        // response from response.js
        error(req, res, 'Invalid Information', 400, e)
      });

})

router.post('/', (req, res) => {
  // get body req.body
  // get query req.query

  addUser(req.body)
    .then((data) => {
      // response from response.js
      success(req, res, data, 201)
    })
    .catch(
      (e) => {
        // response from response.js
        error(req, res, 'Invalid Information', 400, e)
      });
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  let userData = req.body

  updateUser(id, userData)
    .then((data) => {
      success(req, res, data, 201)
    })
    .catch((e) => {
      // response from response.js
      error(req, res, 'Error interno', 500, e)
    }
    )
})

router.delete('/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(() => {
      success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    })
    .catch(e => {
      error(req, res, "Error interno", 500, e)
    })
})

export default router;
