import fs from "fs";
import request from "request";

export default {
  config: {
    name: "help",
    version: "1.0.3",
    author: "SK-SIDDIK-KHAN",
    cooldown: 5,
    role: 0,
    shortDescription: "Show all commands or command details",
    longDescription: "Show all available commands or command details",
    category: "guide",
    guide: "{pn} [command name | page number]"
  },

  onCall: async function({ message, args, event, threadsData }) {
    try {
      if (!global.client || !global.client.commands) {
        return message.reply("❌ Bot commands not loaded yet. Please try again later.");
      }

      const commands = global.client.commands;
      const commandName = (args[0] || "").toLowerCase();
      const command = commands.get(commandName);

      const threadSetting = await threadsData.get(event.threadID) || {};
      const prefix = threadSetting.prefix || global.config.prefix || "!";

      // যদি command name না দেয়া হয় বা কমান্ড না মিলে তাহলে কমান্ড লিস্ট দেখাবে
      if (!command) {
        const arrayInfo = Array.from(commands.keys()).sort();
        const page = Math.max(1, parseInt(args[0]) || 1);
        const perPage = 20;
        const totalPages = Math.ceil(arrayInfo.length / perPage);

        if (page > totalPages)
          return message.reply(`❌ Page ${page} doesn't exist. Max page: ${totalPages}.`);

        const start = (page - 1) * perPage;
        const msg = `┏━[ 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 ]━➣\n${arrayInfo
          .slice(start, start + perPage)
          .map((cmd, i) => `┃━➤  ${start + i + 1} •──⋅☾ ${cmd}`)
          .join("\n")}\n┃━━━━━━━━━━━━━━━➢\n┃━➤ 𝐏𝐀𝐆𝐄 (${page}/${totalPages})\n┃━➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${arrayInfo.length}\n┗━━[ 𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧 ]━━━➣`;

        return downloadAndSendImage(message, msg);
      }

      // যদি কমান্ড পেয়ে যায়, তাহলে কমান্ডের ডিটেইলস দেখাবে
      const cmdConfig = command.config;
      const msg = `📝 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢:\n━━━━━━━━━━━━━━━\n📌 Name: ${cmdConfig.name}\n📖 Description: ${cmdConfig.shortDescription || "None"}\n📚 Category: ${cmdConfig.category}\n📎 Usage: ${prefix}${cmdConfig.name} ${cmdConfig.guide || ""}\n⏱️ Cooldown: ${cmdConfig.cooldown || 0}s\n🧠 Role: ${cmdConfig.role == 0 ? "User" : cmdConfig.role == 1 ? "Admin" : "Bot Admin"}\n👤 Author: ${cmdConfig.author}`;

      return downloadAndSendImage(message, msg);
    } catch (error) {
      console.error("Error in help onCall:", error);
      return message.reply("❌ Something went wrong while processing the help command.");
    }
  }
};

function downloadAndSendImage(message, msg) {
  const imgUrl = "https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const imgPath = process.cwd() + "/cache/helpimg.png";

  // Ensure cache folder exists
  if (!fs.existsSync(process.cwd() + "/cache")) {
    fs.mkdirSync(process.cwd() + "/cache");
  }

  request(encodeURI(imgUrl))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", () => {
      message.reply(
        {
          body: msg,
          attachment: fs.createReadStream(imgPath)
        },
        () => {
          try {
            fs.unlinkSync(imgPath);
          } catch (e) {
            console.log("Error deleting temp image:", e);
          }
        }
      );
    });
}
