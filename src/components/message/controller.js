import { socket } from '../../socket.js'
import { add, list, update, remove } from './store.js'
import chalk from 'chalk'

export const addMessage = (chat, user, message, file) => {

  let fileUrl = ''

  if (file) {
    fileUrl = `http://localhost:3001/app/files/${file.filename}`
  }

  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {

      return reject(chalk.red('[message] There is not user or message or chat'))
    }

    const fullMessage = {
      chat,
      user,
      message,
      fileUrl,
      createAt: new Date()
    }

    // save to bd
    add(fullMessage);
    socket.io.emit('message', fullMessage);

    // to network
    return resolve(fullMessage);
  })
}

export const getMessages = (filterChat) => {
  return new Promise((resolve) => {
    resolve(list(filterChat));
  })
}

export const updateMessage = (id, message) => {

  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      return reject(chalk.red('Invalid data'))
    }

    const rta = await update(id, message)

    resolve(rta)
  })
}

export const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(chalk.red('Invalid data'))
    }

    remove(id)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error)
      })
  })
}
