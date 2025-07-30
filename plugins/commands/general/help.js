export default {
  config: {
    name: "help",
    version: "1.0.2",
    author: "SK-SIDDIK-KHAN",
    cooldown: 5,
    role: 0,
    shortDescription: "Show all commands",
    longDescription: "Show all available commands or command details",
    category: "guide",
    guide: "{pn} [command name | page number]"
  },

  onCall: async function ({ message, args, event, threadsData, getLang }) {
    const { commands } = global.client;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = await threadsData.get(event.threadID) || {};
    const prefix = threadSetting.prefix || global.config.prefix;

    if (!command) {
      const arrayInfo = Array.from(commands.keys()).sort();
      const page = Math.max(1, parseInt(args[0]) || 1);
      const perPage = 20;
      const totalPages = Math.ceil(arrayInfo.length / perPage);
      if (page > totalPages) return message.reply(`❌ Page ${page} doesn't exist. Max page: ${totalPages}.`);

      const start = (page - 1) * perPage;
      const msg = `┏━[ 𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 ]━➣\n${arrayInfo.slice(start, start + perPage).map((cmd, i) => `┃━➤  ${start + i + 1} •──⋅☾ ${cmd}`).join("\n")}\n┃━━━━━━━━━━━━━━━➢\n┃━➤ 𝐏𝐀𝐆𝐄 (${page}/${totalPages})\n┃━➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${arrayInfo.length}\n┗━━[ 𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧 ]━━━➣`;

      return downloadAndSendImage(message, msg);
    }

    const cmdConfig = command.config;
    const msg = `📝 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢:\n━━━━━━━━━━━━━━━\n📌 Name: ${cmdConfig.name}\n📖 Description: ${cmdConfig.shortDescription || "None"}\n📚 Category: ${cmdConfig.category}\n📎 Usage: ${prefix}${cmdConfig.name} ${cmdConfig.guide || ""}\n⏱️ Cooldown: ${cmdConfig.cooldown || 0}s\n🧠 Role: ${cmdConfig.role == 0 ? "User" : cmdConfig.role == 1 ? "Admin" : "Bot Admin"}\n👤 Author: ${cmdConfig.author}`;

    return downloadAndSendImage(message, msg);
  }
};

async function downloadAndSendImage(message, msg) {
  const imgUrl =
    "https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const imgPath = process.cwd() + "/cache/helpimg.png";

  if (!fs.existsSync(process.cwd() + "/cache")) {
    fs.mkdirSync(process.cwd() + "/cache");
  }

  try {
    const response = await axios({
      url: imgUrl,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      message.reply(
        {
          body: msg,
          attachment: fs.createReadStream(imgPath),
        },
        () => fs.unlinkSync(imgPath)
      );
    });

    writer.on("error", (err) => {
      console.error("Error writing image file:", err);
      message.reply("❌ Failed to download the image.");
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    message.reply("❌ Failed to fetch the image.");
  }
}
