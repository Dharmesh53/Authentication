import connectToDB from "db/connectToDB";
import { httpServer } from "app";
import logger from "logger/winston.logger";

const startServer = () => {
  httpServer.listen(process.env.PORT_X, () => {
    logger.info(`⚙️ Server is running on port ${process.env.PORT_X}`);
  });
};

connectToDB()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    logger.error("Error connecting to database,", error);
  });
