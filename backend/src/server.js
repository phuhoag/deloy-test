import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import routers from "./routers/index.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// middleware;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

routers(app);

app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server đang chạy localhost ${PORT}`);
  });
});
