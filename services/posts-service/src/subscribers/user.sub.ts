// import { consume } from "../config/rabbitmq";
// import UserCache from "../models/userCache"; // Or Redis table etc.

// export const subscribeUserEvents = async () => {
//   await consume("user.created", async (data) => {
//     console.log("Received user.created", data);
//     await UserCache.create(data);
//   });
// };
