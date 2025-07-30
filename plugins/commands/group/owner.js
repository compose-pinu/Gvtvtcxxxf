import axios from "axios";
import fs from "fs";
import path from "path";

export default {
  config: {
    name: "ownerinfo",
    author: "Tokodori",
    role: 0,
    shortDescription: "Show owner info with video",
    longDescription: "Display information about the bot owner with a video attachment",
    category: "admin",
    guide: "{pn}"
  },

  async onCall({ api, event }) {
    try {
      const ownerInfo = {
        name: "SAIFUL ISLAM",
        gender: "Male",
        age: "20+",
        height: "6.1",
        choice: "Coding & Gaming",
        nick: "SIFU"
      };

      const videoUrl = "https://files.catbox.moe/a86iqb.mp4";
      const tmpFolderPath = path.join(process.cwd(), "tmp");

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      // ভিডিও ডাউনলোড
      const videoResponse = await axios.get(videoUrl, {
        responseType: "arraybuffer"
      });
      const videoPath = path.join(tmpFolderPath, "owner_video.mp4");
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, "binary"));

      // মেসেজ তৈরী
      const message = `
╭─────────────[ Owner Info ]─────────────╮
├ 𝗡𝗮𝗺𝗲: ${ownerInfo.name}
├ 𝗚𝗲𝗻𝗱𝗲𝗿: ${ownerInfo.gender}
├ 𝗔𝗴𝗲: ${ownerInfo.age}
├ 𝗡𝗶𝗰𝗸: ${ownerInfo.nick}
├ 𝗖𝗵𝗼𝗶𝗰𝗲: ${ownerInfo.choice}
├ 𝗛𝗲𝗶𝗴𝗵𝘁: ${ownerInfo.height}
╰───────────────────────────────────────╯
`;

      // ভিডিও সহ মেসেজ পাঠাও
      await api.sendMessage(
        {
          body: message,
          attachment: fs.createReadStream(videoPath)
        },
        event.threadID,
        event.messageID
      );

      // রিয়েকশন (ঐচ্ছিক)
      if (event.body?.toLowerCase().includes("ownerinfo")) {
        api.setMessageReaction("🖤", event.messageID, () => {}, true);
      }
    } catch (error) {
      console.error("❌ Error in ownerinfo command:", error);
      await api.sendMessage(
        "⚠️ Sorry, something went wrong while processing your request.",
        event.threadID
      );
    }
  }
};
