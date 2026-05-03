import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import path from "node:path";

async function main() {
  const PORT = process.env.PORT ?? 8000;
  const app = express();
  const server = http.createServer(app);
  const io = new Server();

  io.attach(server);
  app.use(express.json());
  app.use(express.static(path.resolve("./public")));
  app.get("/health", (req, res) => {
    return res.json({ healthy: "ok" });
  });
  server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
}

main();
