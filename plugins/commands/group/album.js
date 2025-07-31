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

async function downloadFile(url, filePath) {
  const writer = fs.createWriteStream(filePath);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function handleReply({ message, eventData }) {
  try {
    const senderId =
      (message.senderID || message.from || message.userID || null) ??
      (eventData.author || null);

    if (senderId !== eventData.author) return;

    const input = message.body?.trim();
    if (!input) return message.reply("❌ Please reply with a number.");

    const index = parseInt(input);
    if (
      isNaN(index) ||
      index < 1 ||
      index > eventData.albumCategories.length
    )
      return message.reply("❌ Please enter a valid number from the list.");

    const selectedCategory = eventData.albumCategories[index - 1];
    const urls = videoLinks[selectedCategory];
    if (!urls || urls.length === 0)
      return message.reply("❌ No videos found for this category.");

    const videoURL = urls[Math.floor(Math.random() * urls.length)];

    const cacheDir = path.join("cache", "album", selectedCategory);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = path.join(cacheDir, fileName);

    const loadingMsg = await message.reply("⏳ Downloading your video...");

    await downloadFile(videoURL, filePath);

    if (loadingMsg.messageID) await message.unsend(loadingMsg.messageID);

    await message.reply({
      body: `🎬 Here's a random ${selectedCategory.toUpperCase()} video:`,
      attachment: fs.createReadStream(filePath),
    });

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("❌ Error in album reply handler:", error);
    message.reply("❌ An error occurred while processing your reply.");
  }
}

export async function onCall({ message }) {
  try {
    const categories = Object.keys(videoLinks);
    const list = categories
      .map((cat, i) => `${i + 1}. ${cat.toUpperCase()}`)
      .join("\n");

    const prompt = `📁 Choose a video category:\n\n${list}\n\n📥 Reply with a number (1-${
      categories.length
    })`;

    const sentMsg = await message.reply(prompt);

    return sentMsg.addReplyEvent({
      eventData: {
        author: message.senderID,
        albumCategories: categories,
      },
      callback: handleReply,
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
