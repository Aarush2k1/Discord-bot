const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "$";

client.on("message", async (msg) => {
  // if author bot, don't send any message
  if (msg.author.bot) return;

  // if msg starts with prefix, store commans in arry
  if (msg.content.startsWith(prefix)) {
    const [commandName, ...args] = msg.content.trim().substring().split(/\s+/);
    switch (commandName) {
      case "$coa":
        sendDocuments("coa", args, msg);
        break;
      case "$ps":
        sendDocuments("pands", args, msg);
        break;
      case "$ml":
        sendDocuments("ml", args, msg);
        break;
      case "$se":
        sendDocuments("se", args, msg);
        break;
      case "$ele":
        sendDocuments("ele", args, msg);
        break;
      default:
        msg.reply("Commands are:\n $coa");
    }
  }
});

function sendDocuments(name, args, msg) {
  if (args == "") {
    fetchsubject(name);
    msg.reply(name + " resources are:");
  } else {
    if (args == "syllabus") {
      console.log("syallbus");
    }
  }
}

client.login(process.env.TOKEN);
