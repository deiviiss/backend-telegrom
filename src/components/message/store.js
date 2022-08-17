import { Model } from './model.js'

// add message
export function add(message) {
  if (!message) throw new Error('Invalid data')

  try {
    const Mymessage = new Model(message);
    Mymessage.save();
  }
  catch (error) {
    console.log(error);
    throw new Error('Server error creating message')
  }
}

// list message
export async function list(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};

    if (filterChat !== null) {
      filter = { chat: filterChat };
    }

    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error)
        }

        resolve(populated)
      })
  })
}

// edit message
export async function update(id, message) {

  if (!id || !message) throw new Error('Invalid data')

  try {
    const updatedMessage = await Model.findByIdAndUpdate(
      { _id: id },
      { message }
    )

    return updatedMessage
  } catch (error) {
    throw new Error('Server error updating message')
  }
}

// delete
export async function remove(id) {
  if (!id) throw new Error('Missing id')

  try {
    const rta = await Model.deleteOne({ _id: id })
    console.log(rta);
    return rta;
  } catch (error) {
    console.log(error);
    throw new Error('Server error delete message')
  }
}
