import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name: { type: String, min: 2, max: 50, required: true },

    email: { type: String, min: 5, max: 50, required: true, unique: true },

    password: { type: String, required: true },

    age: { type: Number, required: true },

    phoneNumber: { type: String, required: true, unique: true }, 

    country: { type: String, required: true },
    
    gender: { type: String, required: true }
})

 const User = mongoose.model('User', userSchema);
export default User;

