const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on("connection", (ws) => {
  if (clients.length >= 2) {
    ws.send("Chat is full (2 users only).");
    ws.close();
    return;
  }

  clients.push(ws);
  console.log("User connected");

  ws.on("message", (message) => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(client => client !== ws);
    console.log("User disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
