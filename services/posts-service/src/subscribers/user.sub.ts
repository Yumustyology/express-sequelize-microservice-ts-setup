import {
  cacheUser,
  deleteUserFromCache,
  updateUserInCache,
} from "../cache/userCache.js";
import { consumeWithRetry } from "../config/rabbitmq.js";

export async function subscribeUserEvents() {
  const queue = "user.events";

  await consumeWithRetry(queue, async (event) => {
    switch (event.eventType) {
      case "user.created":
        console.log("👤 Handle user.created:", event.data);
        cacheUser(event.data);
        break;

      case "user.deleted":
        console.log("🗑️ Handle user.deleted:", event.data);
        deleteUserFromCache(event.data.id);
        break;

      case "user.updated":
        console.log("✏️ Handle user.updated:", event.data);
        updateUserInCache(event.data);
        break;

      default:
        console.log("⚠️ Unknown event:", event.eventType);
    }
  });

  console.log("👂 Listening for user events...");
}
