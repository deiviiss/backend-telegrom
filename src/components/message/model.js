import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: 'Chat'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  file: String,
  date: Date,
});

export const Model = mongoose.model('Message', messageSchema);
