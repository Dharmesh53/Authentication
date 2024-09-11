import mongoose, { Connection } from "mongoose";
import logger from "../logger/winston.logger";

export let DBConnection: Connection | undefined = undefined;

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL_X
    );
    DBConnection = connectionInstance.connection;
    logger.info(`☘️ Connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

// const connectToDB = (): Promise<typeof mongoose.connection> => {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(process.env.MONGODB_URL_X, {
//       serverSelectionTimeoutMS: 5000,
//     });

//     mongoose.connection.once("open", () => {
//       resolve(mongoose.connection);
//     });

//     mongoose.connection.on("error", (error: Error) => {
//       reject(error);
//     });
//   });
// };

export default connectToDB;
