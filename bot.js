const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");

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
        sendDocuments("ps", args, msg);
        break;
      case "$np":
        sendDocuments("np", args, msg);
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
        fs.readFile("./subjects/default.txt", (err, data) => {
          if (err) throw err;
          msg.reply(data.toString());
        });
    }
  } else {
    fs.readFile("./subjects/default.txt", (err, data) => {
      if (err) throw err;
      msg.reply(data.toString());
    });
  }
});

function sendDocuments(name, args, msg) {
  if (args == "") {
    // fetchsubject(name);

    fs.readFile("./subjects/" + name + ".txt", (err, data) => {
      if (err) throw err;

      msg.reply(
        commandName.substring(1, commandName.length) +
          " resources are:\n" +
          data.toString()
      );
    });
  } else {
    if (args == "syllabus") {
      fs.readFile("./subjects/" + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        let start = out.indexOf("[");
        let end = out.indexOf("]");

        msg.reply(out.substring(start + 1, end));
      });
    } else if (args == "material") {
      fs.readFile("./subjects/" + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        let start = out.indexOf("{");
        let end = out.indexOf("}");

        msg.reply(out.substring(start + 1, end));
      });
    }
  }
}

client.login(process.env.TOKEN);
