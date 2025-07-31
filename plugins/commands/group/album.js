import fs from "fs";
import path from "path";
import axios from "axios";

export const config = {
  name: "album",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Send random video from selected album category",
  category: "media",
  usages: "",
  cooldowns: 5,
};

const videoLinks = {
  girls: [
    "https://i.imgur.com/3EXzdzu.mp4",
    "https://i.imgur.com/kw3Mx4U.mp4",
  ],
  boys: [
    "https://i.imgur.com/9k1z7Yw.mp4",
    "https://i.imgur.com/bYoP16U.mp4",
  ],
  anime: [
    "https://i.imgur.com/ALwIQAr.mp4",
    "https://i.imgur.com/HfA1lKG.mp4",
  ],
  sad: [
    "https://i.imgur.com/k5cOdEn.mp4",
    "https://i.imgur.com/T1nZgSl.mp4",
  ],
};

export async function onCall({ message, event }) {
  const categories = Object.keys(videoLinks);
  const list = categories
    .map((cat, i) => `${i + 1}. ${cat.toUpperCase()}`)
    .join("\n");

  const msg = `📁 Choose a video category:\n\n${list}\n\n📥 Reply with a number (1-${categories.length})`;

  const sent = await message.reply(msg);

  sent.addReplyEvent({
    author: event.senderID,
    albumCategories: categories,
    callback: async ({ message: replyMsg, data, event }) => {
      try {
        if (event.senderID !== data.author) return;

        const index = parseInt(replyMsg.body?.trim());
        if (isNaN(index) || index < 1 || index > data.albumCategories.length) {
          return replyMsg.reply("❌ Please enter a valid number from the list.");
        }

        const selectedCategory = data.albumCategories[index - 1];
        const urls = videoLinks[selectedCategory];
        const videoURL = urls[Math.floor(Math.random() * urls.length)];

        const cachePath = path.join("cache", "album", selectedCategory);
        if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

        const fileName = `video_${Date.now()}.mp4`;
        const filePath = path.join(cachePath, fileName);

        const loadingMsg = await replyMsg.reply("⏳ Downloading your video...");

        // Download video
        const res = await axios({
          method: "GET",
          url: videoURL,
          responseType: "stream",
        });

        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);

        writer.on("finish", async () => {
          if (loadingMsg.messageID) {
            await replyMsg.unsend(loadingMsg.messageID);
          }

          await replyMsg.reply({
            body: `🎬 Here's a random ${selectedCategory.toUpperCase()} video:`,
            attachment: fs.createReadStream(filePath),
          });

          fs.unlinkSync(filePath);
        });

        writer.on("error", async (err) => {
          console.error("❌ Video write error:", err);
          if (loadingMsg.messageID) {
            await replyMsg.unsend(loadingMsg.messageID);
          }
          await replyMsg.reply("❌ Failed to save video.");
        });
      } catch (err) {
        console.error("❌ Album reply error:", err);
        replyMsg.reply("❌ An error occurred while processing your reply.");
      }
    },
  });
}

export default {
  config,
  onCall,
};
