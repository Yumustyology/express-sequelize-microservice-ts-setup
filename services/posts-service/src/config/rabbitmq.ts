import amqplib from "amqplib";

let channel: amqplib.Channel;

export const connectRabbitMQ = async (url: string) => {
  const connection = await amqplib.connect(url);
  channel = await connection.createChannel();
  console.log("✅ Connected to RabbitMQ");
  return channel;
};

export const publish = async (queue: string, data: any) => {
  if (!channel) throw new Error("Channel not initialized");
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
};

export const consume = async (queue: string, handler: (data: any) => void) => {
  if (!channel) throw new Error("Channel not initialized");
  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      handler(data);
      channel.ack(msg);
    }
  });
};
