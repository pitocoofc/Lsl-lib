const { Client } = require("stoat.js");
const fs = require("fs");
const path = require("path");

global.print = function(...args) {
    console.log(...args);
};

class LslClient {
    constructor() {
        this.rawClient = new Client();
        this.user = null;
        this.plugins = [];
        this.carregarModulosLocais();
    }

    carregarModulosLocais() {
        const modulesDir = path.join(process.cwd(), "modules");

        if (!fs.existsSync(modulesDir)) {
            fs.mkdirSync(modulesDir, { recursive: true });
            return;
        }

        const pastas = fs.readdirSync(modulesDir);
        for (const pasta of pastas) {
            const modulePath = path.join(modulesDir, pasta);
            if (fs.statSync(modulePath).isDirectory()) {
                try {
                    const mod = require(modulePath);
                    if (typeof mod === "function") {
                        mod(this);
                        this.plugins.push(pasta);
                        print(`[Lsl-lib] Módulo '${pasta}' carregado com sucesso.`);
                    }
                } catch (err) {
                    print(`[Lsl-lib Erro] Falha ao carregar o módulo '${pasta}':`, err.message);
                }
            }
        }
    }

    use(plugin, options = {}) {
        if (typeof plugin === "function") {
            plugin(this, options);
            this.plugins.push(plugin.name || "AnonymousPlugin");
            print(`[Lsl-lib] Módulo carregado com sucesso.`);
        }
        return this;
    }

    on(event, callback) {
        if (event === "ready") {
            this.rawClient.once("ready", () => {
                this.user = this.rawClient.user;
                callback();
            });
        }
        else if (event === "messageCreate") {
            this.rawClient.on("messageCreate", (message) => {
                message.reply = (content) => {
                    if (message.channel && typeof message.channel.sendMessage === "function") {
                        return message.channel.sendMessage(content);
                    }
                };
                callback(message);
            });
        }
        else {
            this.rawClient.on(event, callback);
        }
        return this;
    }

    loginBot(token) {
        print("[Lsl-lib] Conectando ao gateway do Stoat...");

        if (this.rawClient.on) {
            this.rawClient.on("error", (err) => {
                print("[Lsl-lib Erro]", err);
            });
        }

        this.rawClient.loginBot(token);
    }
}

const Stoat = {
    Client: {
        new: function() {
            return new LslClient();
        }
    }
};

module.exports = Stoat;
                          
