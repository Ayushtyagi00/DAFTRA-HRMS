const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const pinohttp = require("pino-http");
const helmet = require("helmet");

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
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  pinohttp({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname,reqId,req,res",
        messageFormat: "{msg}",
      },
    },

    customLogLevel(req, res, err) {
      if (err || res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },

    customSuccessMessage(req, res) {
      return `${req.method} ${req.url} | Status: ${res.statusCode} | Time: ${res.responseTime}ms | Message: ${res.statusMessage}`;
    },
  }),
);

app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode`);
  console.log(`Server is running on port ${PORT}`);
});
