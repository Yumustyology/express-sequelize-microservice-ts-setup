import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userProxy from "./routes/users";
import postProxy from "./routes/posts";

dotenv.config();
const app = express();


app.use(cors());
app.use(helmet());
app.use(
  morgan(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  ) as unknown as express.RequestHandler
);

app.use("/users", userProxy);
app.use("/posts", postProxy);

app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "API Gateway running" }));


app.use((_req, res) => {
  res.status(404).json({ error: "Route not found in gateway" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
