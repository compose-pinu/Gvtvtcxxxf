import axios from "axios";
import fs from "fs";
import path from "path";

export default {
  config: {
    name: "owner",
    author: "Tokodori",
    role: 0,
    shortDescription: "Show owner info with photo",
    longDescription: "Display owner information with a JPEG photo",
    category: "admin",
    guide: "{pn}"
  },

  async onCall({ api, event }) {
    try {
      const ownerInfo = {
        name: "SK SIDDIK",
        gender: "Male",
        age: "20+",
        height: "6.1",
        choice: "Russian",
        nick: "dj"
      };

      const imageUrl = "https://i.imgur.com/n5xunuE.jpeg"; 

      const tmpFolderPath = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer"
      });
      const imagePath = path.join(tmpFolderPath, "owner_photo.jpg");
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));

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
      await api.sendMessage(
        {
          body: message,
          attachment: fs.createReadStream(imagePath)
        },
        event.threadID,
        event.messageID
      );

      if (event.body?.toLowerCase().includes("ownerinfo")) {
        api.setMessageReaction("🖤", event.messageID, () => {}, true);
      }
    } catch (error) {
      console.error("❌ Error in ownerinfo command:", error);
      await api.sendMessage(
        "Error",
        event.threadID
      );
    }
  }
};
