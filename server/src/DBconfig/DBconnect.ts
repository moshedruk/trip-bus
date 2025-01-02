
import { connect } from "mongoose";



export const connectToMongo = async () => {
  try {
    await connect(`${process.env.MONGO_URI}`);
    console.log(`Connected to MongoDB`);
    
  } catch (err) {
    console.error("Can't connect to MongoDB", err);
  }
};
