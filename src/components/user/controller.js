import { add, update, remove, list } from './store.js'
import chalk from 'chalk'

export const listUsers = () => {
  return list();
}

export const addUser = (user) => {

  if (!user) {
    return Promise.reject('[message] There is not user')
  }

  const fullUser = {
    name: user.name,
    email: user.email,
    createAt: new Date()
  }

  return add(fullUser);
}

export const updateUser = (id, userData) => {
  console.log(userData);
  return new Promise(async (resolve, reject) => {
    if (!id || !userData) {
      return reject(chalk.red('Invalid data'))
    }

    // const fullUser = {
    //   user: user.name,
    //   email: user.email,
    //   createAt: new Date()
    // }


    const rta = await update(id, userData)

    resolve(rta)
  })
}

export const deleteUser = (id) => {
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
