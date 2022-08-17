import { Model } from './model.js';

// add chat
export function add(chat) {

  if (!chat) {
    throw new Error('Invalid chat')
  }

  try {
    const newChat = new Model(chat);

    // is a promise
    return newChat.save();
  } catch (error) {
    throw new Error('Server error creating chat')
  }
}

// list chats
export function list(userId) {

  return new Promise((resolve, reject) => {
    let filter = {};

    if (userId) {
      filter = {
        users: userId
      }
    }

    Model.find(filter)
      .populate('users')
      .exec((error, populated) => {
        if (error) {
          reject(error)
        }

        resolve(populated)
      })

  })

}
