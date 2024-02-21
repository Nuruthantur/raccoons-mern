import express from "express";
import colors from "colors";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import passport from "passport";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import jwtStrategy from "./config/passportConfig.js";

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.use(passport.initialize());
  passport.use(jwtStrategy);
};

const addRoutes = () => {
  app.use("/api/tasks", taskRouter);
  app.use("/api/users", userRouter);
  app.use("*", (req, res) =>
    res.status(404).json({ error: "Endpoint not found!".bgRed })
  );
};

const startServer = () => {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(
      "Mongoose connected, server is running on port: ".bgMagenta + port
    );
  });
};

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Established connection to MongoDB".bgCyan);
  } catch (error) {
    console.log("error connecting to MongoDb".bgRed, error);
  }
};

(async function controller() {
  await DbConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
