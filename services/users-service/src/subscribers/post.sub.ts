import {
  cachePost,
  deletePostFromCache,
  updatePostInCache,
} from "../cache/postsCache.js";
import { consumeWithRetry } from "../config/rabbitmq.js";

export async function subscribePostEvents() {
  const queue = "post.events";

  await consumeWithRetry(queue, async (event) => {
    switch (event.eventType) {
      case "post.created":
        console.log("👤 Handle post.created:", event.data);
        cachePost(event.data);
        break;

      case "post.deleted":
        console.log("🗑️ Handle post.deleted:", event.data);
        deletePostFromCache(event.data.id);
        break;

      case "post.updated":
        console.log("✏️ Handle post.updated:", event.data);
        updatePostInCache(event.data);
        break;

      default:
        console.log("⚠️ Unknown event:", event.eventType);
    }
  });

  console.log("👂 Listening for post events...");
}
