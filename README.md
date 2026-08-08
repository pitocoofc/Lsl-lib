# Modules

LSL-LIB also provides a simple module manager:

./lsl install user/repository

Modules are installed inside the "modules/" directory.

License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).


LSL-LIB

What is LSL-LIB?

Are you familiar with "Stoat" (https://stoat.chat/)? It's a large, open-source communication platform aiming to be an alternative to Discord.

And what about the Lua programming language? Are you familiar with it?

LSL-LIB mixes both structures: the syntax and structure inspired by Lua with the functionalities of Stoat.

The interpreter is written in JavaScript and uses "stoat.js" internally.

# Example

```const { Client } = require("stoat.js");

const client = new Client();

client.on("ready", () => {
    print("Bot connected!");
});

client.loginBot("YOUR_TOKEN");



