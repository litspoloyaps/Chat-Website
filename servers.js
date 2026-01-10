const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = 0;
const MAX_USERS = 2;

io.on("connection", (socket) => {

    if (users >= MAX_USERS) {
        socket.emit("room-full");
        socket.disconnect(true);
        return;
    }

    users++;
    console.log("User connected:", users);

    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        users--;
        console.log("User disconnected:", users);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
