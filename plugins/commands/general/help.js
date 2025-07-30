import fs from "fs";
import request from "request";

export default {
  config: {
    name: "help",
    version: "1.0.3",
    author: "SK-SIDDIK-KHAN",
    cooldown: 5,
    role: 0,
    shortDescription: "Show all commands",
    longDescription: "Show all available commands or command details",
    category: "guide",
    guide: "{pn} [command name | page number]"
  },

  onStart: async function ({ message, args, event, threadsData }) {
    const { commands } = global.client;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = await threadsData.get(event.threadID) || {};
    const prefix = threadSetting.prefix || global.config.prefix;

    // ========== Show Command List ==========
    if (!command) {
      const allCommands = Array.from(commands.keys()).sort();
      const page = Math.max(1, parseInt(args[0]) || 1);
      const perPage = 20;
      const totalPages = Math.ceil(allCommands.length / perPage);
      if (page > totalPages)
        return message.reply(`❌ Page ${page} doesn't exist. Max page: ${totalPages}.`);

      const start = (page - 1) * perPage;
      const msg = `┏━[ 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 ]━➣\n${allCommands.slice(start, start + perPage).map((cmd, i) => `┃━➤  ${start + i + 1} •──⋅☾ ${cmd}`).join("\n")}\n┃━━━━━━━━━━━━━━━➢\n┃━➤ 𝐏𝐀𝐆𝐄 (${page}/${totalPages})\n┃━➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${allCommands.length}\n┗━━[ 𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧 ]━━━➣`;

      return sendWithImage(message, msg);
    }

    // ========== Show Single Command Details ==========
    const cfg = command.config;
    const infoMsg = `📝 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢:\n━━━━━━━━━━━━━━━\n📌 Name: ${cfg.name}\n📖 Description: ${cfg.shortDescription || "None"}\n📚 Category: ${cfg.category}\n📎 Usage: ${prefix}${cfg.name} ${cfg.guide || ""}\n⏱️ Cooldown: ${cfg.cooldown || 0}s\n🧠 Role: ${cfg.role == 0 ? "User" : cfg.role == 1 ? "Admin" : "Bot Admin"}\n👤 Author: ${cfg.author}`;

    return sendWithImage(message, infoMsg);
  }
};

// ========== Image Sending Helper ==========
function sendWithImage(message, msg) {
  const imageUrl = "https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const imgPath = process.cwd() + "/cache/helpimg.png";

  request(encodeURI(imageUrl))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", () => {
      message.reply({ body: msg, attachment: fs.createReadStream(imgPath) }, () => {
        fs.unlinkSync(imgPath); // Delete after sending
      });
    });
          }
