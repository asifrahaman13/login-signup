import { connect } from "mongoose";
import { config } from "dotenv";
config()
const MONGODB_URI = process.env.MONGODB_URI
const connectToMongo = async () => {

  // Connect to your MongoDB database
  await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


export default connectToMongo;
