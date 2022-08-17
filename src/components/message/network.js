import { Router } from 'express';
import { success, error } from '../../network/response.js'; // server response
import { addMessage, getMessages, updateMessage, deleteMessage } from './controller.js'
import multer from 'multer';

const router = Router();

const upload = multer({
  dest: 'public/files/',
})

router.get('/', (req, res) => {

  // get headers req.headers

  // send  custom header
  // res.header({
  //   'custom-header': 'Mi header'
  // })

  const filterMessages = req.query.chat || null;

  getMessages(filterMessages)
    .then((messageList) => {
      // response from response.js
      success(req, res, messageList, 200)
    })
    .catch((e) => {
      // response from response.js
      error(req, res, 'Unextpected Error', 500, e)
    })

})

router.post('/',

  upload.single('file'),

  (req, res) => {
    // get body req.body
    // get query req.query

    addMessage(req.body.chat, req.body.user, req.body.message, req.file)
      .then((fullmessage) => {
        // response from response.js
        success(req, res, fullmessage, 201)
      })
      .catch(
        (e) => {
          // response from response.js
          error(req, res, 'Invalid Information', 400, e)
        });
  })

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  let text = req.body.message

  updateMessage(id, text)
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
  deleteMessage(req.params.id)
    .then(() => {
      success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    })
    .catch(e => {
      error(req, res, "Error interno", 500, e)
    })
})

export default router;
