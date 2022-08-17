import { add, list } from './store.js';
import chalk from 'chalk';

export const listChats = (userId) => {
  return list(userId);
}

export const addChat = (users) => {
  console.log(users);
  if (!users || !Array.isArray(users)) {
    return Promise.reject(chalk.red('[message] There is not users'))
  }

  const chat = {
    users: users
  }

  return add(chat)
}
