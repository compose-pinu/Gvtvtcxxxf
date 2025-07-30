import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default {
  config: {
    name: "owner",
    aliases: [],
    version: "1.0",
    author: "Tokodori",
    role: 0,
    shortDescription: "Show owner info",
    longDescription: "",
    category: "group",
    guide: "{pn}"
  },

  onCall: async function ({ message, event }) {
    try {
      const info = `
╭[ . ]•〆 SAIF 〆 ] ─⦿
╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: SAIFUL ISLAM
├‣ 𝐆𝐞𝐧𝐝𝐞𝐫: Male
├‣ 𝐀𝐠𝐞: 20+
├‣ 𝐍𝐢𝐜𝐤: SIFU
├‣ 𝐂𝐡𝐨𝐢𝐜𝐞: 
├‣ 𝐇𝐞𝐢𝐠𝐡𝐭: 6.1
╰────────────◊ 
      `;

      const videoUrl = 'https://files.catbox.moe/a86iqb.mp4';
      const tmpPath = path.join(process.cwd(), 'tmp');

      // tmp ফোল্ডার না থাকলে বানাও
      if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
      }

      const filePath = path.join(tmpPath, 'owner_video.mp4');
      const res = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(filePath, res.data);

      await message.send({
        body: info,
        attachment: fs.createReadStream(filePath)
      });

    } catch (err) {
      console.error("❌ Error in owner command:", err);
      return message.send("⚠️ Owner info পাঠাতে সমস্যা হয়েছে।");
    }
  }
};
