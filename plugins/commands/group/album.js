import fs from 'fs';
import path from 'path';
import axios from 'axios';

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
    "https://i.imgur.com/kw3Mx4U.mp4"
  ],
  boys: [
    "https://i.imgur.com/9k1z7Yw.mp4",
    "https://i.imgur.com/bYoP16U.mp4"
  ],
  anime: [
    "https://i.imgur.com/ALwIQAr.mp4",
    "https://i.imgur.com/HfA1lKG.mp4"
  ],
  sad: [
    "https://i.imgur.com/k5cOdEn.mp4",
    "https://i.imgur.com/T1nZgSl.mp4"
  ]
};

export async function onCall({ message, event }) {
  const categories = Object.keys(videoLinks);
  const list = categories.map((cat, i) => `${i + 1}. ${cat.toUpperCase()}`).join('\n');
  const msg = `📁 Choose a video category:\n\n${list}\n\n📥 Reply with a number (1-${categories.length})`;

  const sent = await message.reply(msg);

  global.xaviaBot.onReply.set(sent.messageID, {
    command: config.name,
    author: event.senderID,
    type: "chooseCategory"
  });
}

export async function onReply({ message, event, Reply }) {
  try {
    if (event.senderID !== Reply.author) return;

    const index = parseInt(event.body?.trim());
    if (isNaN(index)) return message.reply("❌ Please enter a valid number.");

    const categories = Object.keys(videoLinks);
    const selectedCategory = categories[index - 1];
    if (!selectedCategory) return message.reply("❌ Invalid category number.");

    const urls = videoLinks[selectedCategory];
    const videoURL = urls[Math.floor(Math.random() * urls.length)];

    const cachePath = `cache/album/${selectedCategory}`;
    if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = path.join(cachePath, fileName);

    const loadingMsg = await message.reply("⏳ Downloading your video...");

    // Download
    const res = await axios({
      method: "GET",
      url: videoURL,
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);

    writer.on("finish", async () => {
      await message.reply({
        body: `🎬 Here's a random ${selectedCategory.toUpperCase()} video:`,
        attachment: fs.createReadStream(filePath)
      });
      if (loadingMsg.messageID) await message.unsend(loadingMsg.messageID);
      fs.unlinkSync(filePath); // delete after sending
    });

    writer.on("error", async (err) => {
      console.error("❌ Video write error:", err);
      await message.reply("❌ Failed to save video.");
      if (loadingMsg.messageID) await message.unsend(loadingMsg.messageID);
    });

  } catch (err) {
    console.error("❌ Album error:", err);
    return message.reply("❌ An error occurred while processing your request.");
  }
}

export default {
  config,
  onCall,
  onReply
};
