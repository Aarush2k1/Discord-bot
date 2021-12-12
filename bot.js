const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const prefix = "$";
const pathName = path.join(__dirname + "/subjects/");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  let name = client.user.tag;
  console.log(pathName + name + ".txt");
  console.log(name.substring(0, name.indexOf("#")) + " is ready to go!");
});

client.on("messageCreate", async (msg) => {
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
      case "$commands":
        sendDocuments("default", args, msg);
        break;
      default:
        sendDocuments("default", args, msg);
    }
  }
});

function sendDocuments(name, args, msg) {
  if (args == "") {
    // fetchsubject(name);
    fs.readFile(pathName + name + ".txt", (err, data) => {
      if (err) throw err;
      let out = data.toString();
      out = out.replace(/\{|}|\[|]/g, "");
      msg.reply(out);
    });
  } else {
    if (args == "syllabus") {
      fs.readFile(pathName + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        msg.reply(out.substring(out.indexOf("[") + 1, out.indexOf("]")));
      });
    } else if (args == "material") {
      fs.readFile(pathName + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        msg.reply(out.substring(out.indexOf("{") + 1, out.indexOf("}")));
      });
    }
  }
}

client.login(process.env.TOKEN);
