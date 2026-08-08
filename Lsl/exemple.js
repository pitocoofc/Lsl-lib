const Stoat = require("./index.js");

const client = Stoat.Client.new();

client.on("ready", function() {
    print(`[Lsl-lib Teste] Conectado e operando como: ${client.user.username}!`);
});

client.on("messageCreate", function(message) {
    if (message.author?.bot) return;

    if (message.content.trim() === "!ping") {
        message.reply("Pong com helper da Lsl-lib! 🏓");
    }
});

client.loginBot("YOU TOKEN");
