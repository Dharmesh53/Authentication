import mongoose, { Connection } from "mongoose";

export let DBConnection: Connection | undefined = undefined;

export default async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.X_MONGODB_URL);
    DBConnection = connectionInstance.connection;
    console.log(`☘️ Connected to ${DBConnection.host}`);
  } catch (error) {
    console.error("Error connecting to the database,", error);
    process.exit(1);
  }
};

export const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Closed");
  } catch (error) {
    console.error("Error connecting to the database,", error);
    process.exit(1);
  }
};
