import connectToDB, { disconnectFromDB } from "./db";
import { httpServer } from "./app";

const port = process.env.X_PORT;

if (!port) {
  console.error("❌Port is not defined in environment variables");
  process.exit(1);
}

const startServer = () => {
  httpServer.listen(port, () => {
    console.log(`⚙️ Server is running on port ${port}`);
  });
};

connectToDB()
  .then(() => {
    startServer();
  })
  .catch((error: Error) => {
    console.error("❌Error connecting to database,", error);
  });

process.on("SIGINT", async () => {
  console.log("\nClosing database connection");
  await disconnectFromDB();
  process.exit(0);
});
