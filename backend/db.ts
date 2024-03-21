import mongoose  from "mongoose";
import dotenv from "dotenv";


dotenv.config();


export const connectMongoose = () => {
  mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.rlgprfa.mongodb.net/chat2`)
    .then((e:any) => {
      console.log(`Connected to mongoDB: ${e.connection.host}`);
    })
    .catch((err:any) => {
      console.log(err);
    });
};