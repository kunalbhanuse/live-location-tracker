import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import path from "node:path";

async function main() {
  const PORT = process.env.PORT ?? 8000;
  const app = express();
  const server = http.createServer(app);
  const io = new Server();
  app.use(express.json());
  app.use(express.static(path.resolve("./public")));

  io.attach(server);
  io.on("connection", (socket) => {
    console.log(`socket :- ${socket.id} : Connected success ....`);
    socket.on("client:location:update", (locationData) => {
      const { latitude, longitude } = locationData;
      console.log(
        `socket :- ${socket.id} : client:location:update`,
        locationData,
      );
    });
  });

  app.get("/health", (req, res) => {
    return res.json({ healthy: "ok" });
  });
  server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
}

main();
