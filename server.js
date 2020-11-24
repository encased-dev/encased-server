import { createImage, createMetadata } from "./metadata.js";
import { checkExists, getTokenData } from "./web3funcs.js";
import express from "express";
import http from "http";
import io from "socket.io";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(morgan("common"));
app.use(compression());
app.use(helmet());

const server = http.createServer(app);
const socketIo = io(server);
const subscribedEvents = {};
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("listening on *:5000");
});

socketIo.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", function (req, res) {
  res.json({
    status: "Pong!",
  });
});

app.get("/token/:id", async function (req, res) {
  let exists = await checkExists(req.params.id);
  if (!exists) {
    res.sendStatus(404);
  } else {
    let response = createMetadata(req.params.id); 
    res.json({ ...response });
  }
});

app.get("/images/:id", async function (req, res) {
  let exists = await checkExists(req.params.id);
  if (!exists) {
    res.sendStatus(404);
  } else {
    let data = await createImage(req.params.id);
    if (!data) {
      res.sendStatus(504);
    }
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": data.length,
    });
    res.end(data, "binary");
  }
});
