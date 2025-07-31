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

    // Send prompt message and wait for reply only from this user
    const sentMsg = await message.reply(prompt);

    // Attach reply handler that only accepts replies from the original user
    sentMsg.addReplyEvent({
      author: message.senderID, // restrict to original user only
      albumCategories: categories,
      callback: async ({ message: replyMsg, data, event }) => {
        try {
          // Check senderID from event - accept only original user replies
          const senderId = event.senderID || event.sender?.id || event.userID || null;
          if (senderId !== data.author) {
            // Ignore replies from other users
            return;
          }

          const replyText = replyMsg.body?.trim();
          if (!replyText) {
            return replyMsg.reply("❌ Please reply with a number.");
          }

          const selectedIndex = parseInt(replyText);
          if (isNaN(selectedIndex) || selectedIndex < 1 || selectedIndex > data.albumCategories.length) {
            return replyMsg.reply("❌ Invalid number. Please reply with a valid number from the list.");
          }

          const selectedCategory = data.albumCategories[selectedIndex - 1];
          const urls = videoLinks[selectedCategory];
          if (!urls || urls.length === 0) {
            return replyMsg.reply("❌ No videos found for this category.");
          }

          // Pick random video from selected category
          const videoURL = urls[Math.floor(Math.random() * urls.length)];

          // Setup cache directory
          const cacheDir = path.join("cache", "album", selectedCategory);
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }

          const fileName = `video_${Date.now()}.mp4`;
          const filePath = path.join(cacheDir, fileName);

          const loadingMsg = await replyMsg.reply("⏳ Downloading your video...");

          // Download video stream
          const response = await axios({
            method: "GET",
            url: videoURL,
            responseType: "stream",
          });

          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          // Wait for download to finish
          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          // Delete loading message
          if (loadingMsg.messageID) {
            await replyMsg.unsend(loadingMsg.messageID);
          }

          // Send video file to user
          await replyMsg.reply({
            body: `🎬 Here's your random ${selectedCategory.toUpperCase()} video:`,
            attachment: fs.createReadStream(filePath),
          });

          // Clean up downloaded file
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("❌ Error in album reply handler:", err);
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
