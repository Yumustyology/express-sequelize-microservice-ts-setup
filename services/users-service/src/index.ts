import { connectRabbitMQ } from "./config/rabbitmq.js";
import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

const PORT = Number(process.env.PORT || 4001);

async function main() {
  try {
    console.log("🚀 Starting Users API server...");
    console.log("Connecting to users database...");

    if ((app as any).connectDb) {
      await (app as any).connectDb();
      console.log("✅ Users database connected and synced successfully.");
    }

    (async () => {
      await connectRabbitMQ(process.env.RABBITMQ_URL!);

      app.listen(process.env.PORT, () =>
        console.log(`Users service running on ${process.env.PORT}`)
      );
    })();
  } catch (err) {
    console.error("❌ Failed to start users server:", err);
    process.exit(1);
  }
}

main();
