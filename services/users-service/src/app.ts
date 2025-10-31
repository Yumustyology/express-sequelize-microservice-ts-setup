import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import db from "./models/index.js";
import { errorHandler } from "@app/shared/middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  ) as unknown as express.RequestHandler
);

app.get("/health", async (_req, res) => {
  try {
    await db.sequelize.authenticate();
    return res.json({ status: "ok", db: "connected" });
  } catch (err) {
    return res.status(500).json({ status: "error", db: "unreachable" });
  }
});

app.get("/", async (req, res) => {
  res.send("Welcome to the API");
}); 

app.use("/api", userRoutes);

app.use(errorHandler);

(app as any).connectDb = async (options: { force?: boolean } = {}) => {
  await db.sequelize.authenticate();
  await db.sequelize.sync({ force: !!options.force });
};

export default app;
