import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import routers from "./routers/index.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// middleware;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

routers(app);

// frontend;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist"));
  });
}

app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server đang chạy localhost ${PORT}`);
  });
});
