import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
  surname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 55,
  },
  phone: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 12,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Client", clientSchema);
