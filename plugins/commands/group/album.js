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

export async function onCall({ message }) {
  try {
    const categories = Object.keys(videoLinks);
    const list = categories
      .map((cat, i) => `${i + 1}. ${cat.toUpperCase()}`)
      .join("\n");

    const prompt = `📁 Choose a video category:\n\n${list}\n\n📥 Reply with a number (1-${categories.length})`;

    const sentMsg = await message.reply(prompt);

    sentMsg.addReplyEvent({
      author: message.senderID,
      albumCategories: categories,
      callback: async ({ message: replyMsg, data, event }) => {
        try {
          console.log("✅ Reply callback triggered!");

          const senderId =
            event?.senderID ||
            event?.sender?.id ||
            event?.userID ||
            event?.senderUserID ||
            null;

          const replySenderId = replyMsg.senderID || replyMsg.author || null;

          if (senderId === null && replySenderId !== null) {
            if (replySenderId !== data.author) return;
          } else {
            if (senderId !== data.author) return;
          }

          const input = replyMsg.body?.trim();
          if (!input) {
            console.log("❌ No reply input");
            return replyMsg.reply("❌ Please reply with a number.");
          }

          const index = parseInt(input);
          if (isNaN(index) || index < 1 || index > data.albumCategories.length) {
            console.log("❌ Invalid number");
            return replyMsg.reply("❌ Please enter a valid number from the list.");
          }

          const selectedCategory = data.albumCategories[index - 1];
          console.log("Selected category:", selectedCategory);

          const urls = videoLinks[selectedCategory];
          if (!urls || urls.length === 0) {
            console.log("❌ No videos found for this category.");
            return replyMsg.reply("❌ No videos found for this category.");
          }

          const videoURL = urls[Math.floor(Math.random() * urls.length)];
          console.log("Chosen video URL:", videoURL);

          const cacheDir = path.join("cache", "album", selectedCategory);
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
            console.log("Created cache directory:", cacheDir);
          }

          const fileName = `video_${Date.now()}.mp4`;
          const filePath = path.join(cacheDir, fileName);
          console.log("File path:", filePath);

          // ডাউনলোড শুরু
          const response = await axios({
            method: "GET",
            url: videoURL,
            responseType: "stream",
          });

          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", () => {
              console.log("✅ Video downloaded successfully");
              resolve();
            });
            writer.on("error", (error) => {
              console.error("❌ Error writing video file:", error);
              reject(error);
            });
          });

          // ভিডিও পাঠাও
          await replyMsg.reply({
            body: `🎬 Here's your random ${selectedCategory.toUpperCase()} video:`,
            attachment: fs.createReadStream(filePath),
          });
          console.log("✅ Video sent");

          // ফাইল ডিলিট করো
          fs.unlinkSync(filePath);
          console.log("✅ Deleted video file");

        } catch (error) {
          console.error("❌ Error in album reply handler:", error);
          replyMsg.reply("❌ An error occurred while processing your reply.");
        }
      },
    });
  } catch (error) {
    console.error("❌ Error in album command:", error);
    message.reply("❌ An unexpected error occurred.");
  }
}

export default {
  config,
  onCall,
};
