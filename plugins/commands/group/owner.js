import axios from "axios";
import fs from "fs";
import path from "path";

export default {
  config: {
    name: "ownerinfo",
    aliases: ["owner"],
    author: "Tokodori",
    role: 0,
    shortDescription: "Show bot owner info",
    category: "group",
    guide: "{pn}"
  },

  onCall: async function (ctx) {
    const { api, event } = ctx;

    try {
      const imageUrl = `https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      const imagePath = path.join(process.cwd(), "tmp", "ownerinfo.jpg");
      const { data } = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(imagePath, Buffer.from(data, "binary"));

      const msg = `
👑 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 👑
━━━━━━━━━━━━━━━
📛 Name: 𝚂𝙺 𝚂𝙸𝙳𝙳𝙸𝙺 𝙺𝙷𝙰𝙽
📍 Address: Rajshahi
📞 Contact: t.me/rdxprem12
🤖 Bot: SK_SIDDIK_07
📆 Time: ${new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" })}
`;

      await api.sendMessage({
        body: msg,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, event.messageID);

    } catch (err) {
      console.error("❌ Error in ownerinfo:", err);
      if (ctx.api && ctx.event?.threadID) {
        ctx.api.sendMessage("⚠️ Something went wrong while loading owner info.", ctx.event.threadID);
      }
    }
  }
};
