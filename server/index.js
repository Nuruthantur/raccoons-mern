import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api/users", userRouter);  
app.use('*', (req, res) => res.status(404).json({ error: "Endpoint not found." })); 

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log("Mongoose connected, server is running on port " + port);
  });
}).catch(e => console.log("error", e));

app.get('/', (req, res) => {
  res.send('Hi Mom!')
})




