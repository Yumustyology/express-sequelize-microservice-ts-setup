import amqplib, { Channel, ChannelModel, Connection } from "amqplib";

let channel: Channel | null = null;
let connection: ChannelModel | null = null;

const RECONNECT_INTERVAL = 5000;

export async function connectRabbitMQ(url: string): Promise<Channel> {
  if (channel) return channel;

  try {
    const conn = await amqplib.connect(url);
    connection = conn;

    conn.on("error", (err) => {
      console.error("RabbitMQ connection error", err);
      connection = null;
      channel = null;
    });

    conn.on("close", () => {
      console.warn("RabbitMQ connection closed");
      connection = null;
      channel = null;
      setTimeout(() => connectRabbitMQ(url).catch(() => {}), RECONNECT_INTERVAL);
    });

    const ch = await conn.createChannel();
    channel = ch;

    await ch.prefetch(10);

    console.log("✅ RabbitMQ connected");
    return ch;

  } catch (err) {
    console.error("❌ RabbitMQ connection failed, retrying...", err);
    connection = null;
    channel = null;
    await new Promise(res => setTimeout(res, RECONNECT_INTERVAL));
    return connectRabbitMQ(url);
  }
}

export async function publishEvent(queue: string, payload: { 
  eventType: string;
  data: any;
}) {
  const ch = getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
}

export function getChannel(): Channel {
  if (!channel) throw new Error("Channel not initialized. Call connectRabbitMQ first.");
  return channel;
}


/**
 * Handler should be async and throw on failure.
 * queueName: "post.events"
 * retryQueue: "post.events.retry"
 * dlq: "post.events.dlq"
 */
export async function consumeWithRetry(
  queueName: string,
  handler: (payload: any) => Promise<void>,
  maxRetries = 3
) {
  const ch: Channel = getChannel();

  // Ensure queues exist and are durable
  await ch.assertQueue(queueName, { durable: true });
  await ch.assertQueue(`${queueName}.retry`, { durable: true });
  await ch.assertQueue(`${queueName}.dlq`, { durable: true });

  // Consume messages
  ch.consume(queueName, async (msg) => {
    if (!msg) return;

    const raw = msg.content.toString();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch (e) {
      console.error("Invalid JSON, moving to DLQ", raw);
      ch.sendToQueue(`${queueName}.dlq`, Buffer.from(raw), { persistent: true });
      ch.ack(msg);
      return;
    }

    try {
      await handler(payload);
      ch.ack(msg);
    } catch (err) {
      // read retry header (we use x-retries)
      const headers = msg.properties.headers || {};
      const retries = (headers["x-retries"] || 0) as number;

      if (retries < maxRetries) {
        console.warn(`Handler failed, retrying (${retries + 1})`, err);
        // send to retry queue with incremented retry header and TTL on queue side will move it back
        ch.sendToQueue(`${queueName}.retry`, Buffer.from(JSON.stringify(payload)), {
          persistent: true,
          headers: { "x-retries": retries + 1 },
        });
      } else {
        console.error("Max retries reached, moving message to DLQ", payload);
        ch.sendToQueue(`${queueName}.dlq`, Buffer.from(JSON.stringify(payload)), { persistent: true });
      }
      ch.ack(msg);
    }
  });
}
