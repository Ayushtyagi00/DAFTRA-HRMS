const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
const NODE_ENV = (process.env.NODE_ENV || "development").toLowerCase();
dotenv.config({
  path: path.resolve(__dirname, `../.env.${NODE_ENV}`),
});

const authRouter = require("./routers/auth.routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode`);
  console.log(`Server is running on port ${PORT}`);
});
