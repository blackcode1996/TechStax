import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  pass: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [true, "Please provide name"] },
  email: { type: String, required: [true, "Please provide email"] },
  pass: { type: String, required: [true, "Please provide the password"] },
});

const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default userModel;
