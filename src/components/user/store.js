import { Model } from './model.js'

// list users
export function list() {
  // return a promise
  return Model.find();
}

// create user
export function add(user) {
  if (!user) throw new Error('No user')

  try {
    const newUser = new Model(user);

    // is a promise
    return newUser.save();
  }
  catch (error) {
    console.log(error);
    throw new Error('Server error creating user')
  }
}

//! actualizar lo dejo para conforme avance el curso, queda relacionar las tablas.
// edit user
export async function update(id, userData) {
  console.log(userData);
  if (!id || !userData) throw new Error('Invalid data')

  try {
    const updatedUser = await Model.findByIdAndUpdate(
      { _id: id },
      { userData }
    )

    return updatedUser
  } catch (error) {
    throw new Error('Server error updating user')
  }
}

// delete user
export async function remove(id) {
  if (!id) throw new Error('Missing id')

  try {
    const rta = await Model.deleteOne({ _id: id })

    return rta;
  } catch (error) {
    console.log(error);
    throw new Error('Server error delete message')
  }
}
