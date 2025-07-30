import axios from "axios";
import fs from "fs";
import path from "path";

export default {
  config: {
    name: "owner",
    author: "Tokodori",
    role: 0,
    shortDescription: "Show admin info with photo",
    longDescription: "Display bot admin info with Facebook profile picture",
    category: "admin",
    guide: "{pn}"
  },

  async onCall({ api, event }) {
    try {
      // Get current time
      const now = new Date();
      const time = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

      // Facebook profile image
      const img = `https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

      // Download image
      const tmpPath = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath);

      const imagePath = path.join(tmpPath, "admin_photo.jpg");
      const response = await axios.get(img, { responseType: "arraybuffer" });
      fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

      // Fancy admin info message
      const message = `
╭────────────────⊙
├─☾ 𝙰𝚂𝚂𝙰𝙻𝙰𝙼𝚄 𝚆𝙰𝙻𝙰𝙸𝙺𝚄𝙼 
├─☾ 𝙰𝙳𝙼𝙸𝙽 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽
├─☾ 𝙽𝙰𝙼𝙴𝚂 : 𝚂𝙺 𝚂𝙸𝙳𝙳𝙸𝙺 𝙺𝙷𝙰𝙽
├─☾ 𝙰𝙳𝙳𝚁𝙴𝚂𝚂 : 𝚁𝙰𝙹𝚂𝙷𝙰𝙷𝙸
├─☾ 𝙲𝙾𝙽𝚃𝙰𝙲𝚃
├─☾ 𝙵𝙱 : 𝚃𝙰𝙽𝙹𝙸𝙳 𝙷𝙰𝚂𝙰𝙽 𝚃𝙰𝙼𝙸𝙼
├─☾ 𝚃𝙶 : t.me/busy1here
├─☾ 𝙱𝙾𝚃 𝙿𝚁𝙴𝙵𝙸𝚇 : [ - ]
├─☾ 𝙱𝙾𝚃 𝙽𝙰𝙼𝙴 : 𝚂𝙺_𝚂𝙸𝙳𝙳𝙸𝙺_𝟶𝟽
├─☾ 𝚃𝙸𝙼𝙴𝚂 : ${time}
├─☾ 𝚃𝙷𝙰𝙽𝙺𝚂 𝙵𝙾𝚁 𝚄𝚂𝙸𝙽𝙶
╰────────────────⊙
`;

      await api.sendMessage({
        body: message,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, event.messageID);

    } catch (err) {
      console.error("❌ Error in ownerinfo command:", err);
      await api.sendMessage("⚠️ Something went wrong.", event.threadID);
    }
  }
};
