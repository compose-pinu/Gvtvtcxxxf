import axios from "axios";
import fs from "fs";
import path from "path";

export default {
  config: {
    name: "ownerinfo",
    aliases: ["owner"],
    version: "1.0",
    author: "SK SIDDIK",
    category: "admin",
    role: 0,
    shortDescription: "Show owner details",
    guide: "{pn}"
  },

  onCall: async function ({ api, event }) {
    try {
      const time = new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });
      const imageUrl = "https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";

      const tmpDir = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

      const imgPath = path.join(tmpDir, "owner.jpg");
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(response.data), "binary");

      const messageBody = `
👑 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 👑
━━━━━━━━━━━━━━━
📛 Name: 𝚂𝙺 𝚂𝙸𝙳𝙳𝙸𝙺 𝙺𝙷𝙰𝙽
📍 Address: Rajshahi
📞 Contact: t.me/rdxprem12
🤖 Bot: SK_SIDDIK_07
📆 Time: ${time}
`;

      await api.sendMessage(
        { body: messageBody, attachment: fs.createReadStream(imgPath) },
        event.threadID,
        event.messageID
      );

    } catch (err) {
      console.error("❌ Error in ownerinfo command:", err);
      if (api?.sendMessage && event?.threadID) {
        api.sendMessage("⚠️ Something went wrong!", event.threadID);
      }
    }
  }
};
