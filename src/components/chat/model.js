import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

export const Model = mongoose.model('Chat', chatSchema);
