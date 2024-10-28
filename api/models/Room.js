import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: false },
  uName: { type: String, required: true },
  name: { type: String, required: true }, 
 
});


const Room = mongoose.model('Room', roomSchema);

export default Room;