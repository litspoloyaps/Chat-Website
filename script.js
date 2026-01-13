const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// ask username once
const username = prompt("Enter your name:");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim()) {
        socket.emit("chat message", `${username}: ${input.value}`);
        input.value = "";
    }
});

socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

socket.on("room-full", () => {
    document.body.innerHTML = `
        <h2 style="text-align:center; margin-top:50px;">
            ❌ This chat is already full (2 users only)
        </h2>
    `;
});
