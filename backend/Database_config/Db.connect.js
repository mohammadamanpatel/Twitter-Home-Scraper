import mongoose from "mongoose";

const DBConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("DB is connected", connection.host);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
export default DBConnection;
