require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const config = require("./config");

const intialize = require("./helpers/init");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
  ],
});

client.prefix = config.prefix;

intialize(client);
