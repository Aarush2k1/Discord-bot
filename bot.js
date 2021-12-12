const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  let name = client.user.tag;
  console.log(name.substring(0, name.indexOf("#")) + " is ready to go!");
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

    fs.readFile("/discord_bot/subjects/" + name + ".txt", (err, data) => {
      if (err) throw err;
      let out = data.toString();
      for (let i = 0; i < out.length; i++) {
        if (out[i] == "{" || out[i] == "}" || out[i] == "[" || out[i] == "]") {
          out[i] = "";
        }
      }
      msg.reply(out);
    });
  } else {
    if (args == "syllabus") {
      fs.readFile("/discord_bot/subjects/" + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        msg.reply(out.substring(out.indexOf("["), out.indexOf("]")));
      });
    } else if (args == "material") {
      fs.readFile("/discord_bot/subjects/" + name + ".txt", (err, data) => {
        if (err) throw err;
        let out = data.toString();
        msg.reply(out.substring(out.indexOf("{"), out.indexOf("}")));
      });
    }
  }
}

client.login(process.env.TOKEN);
