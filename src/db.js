import mongoose from 'mongoose';

// conection to BD
export default async function conectionDB(URI) { await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }) }
