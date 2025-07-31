import fs from "fs";
import path from "path";
import axios from "axios";

export const config = {
  name: "album",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Send a video based on selected album category",
  category: "media",
  usages: "/album",
  cooldowns: 5,
};

const categories = {
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
    const senderID = message.senderID;
    if (!eventData || !eventData.categoryList) {
      return message.reply("❌ Session expired. Try /album again.");
    }

    if (senderID !== eventData.author) {
      return message.reply("❌ Only the original user can reply.");
    }

    const input = message.body?.trim();
    if (!input) return message.reply("❌ Please reply with a number.");

    const index = parseInt(input);
    if (isNaN(index) || index < 1 || index > eventData.categoryList.length) {
      return message.reply("❌ Invalid selection. Try again.");
    }

    const selected = eventData.categoryList[index - 1];
    const links = categories[selected];

    if (!links || links.length === 0)
      return message.reply("❌ No videos found in this category.");

    const videoURL = links[Math.floor(Math.random() * links.length)];
    const cacheDir = path.join("cache", "album", selected);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = path.join(cacheDir, fileName);

    const waiting = await message.reply("⏳ Downloading video...");

    await downloadFile(videoURL, filePath);

    if (waiting?.messageID) await message.unsend(waiting.messageID);

    await message.reply({
      body: `🎬 ${selected.toUpperCase()} video:`,
      attachment: fs.createReadStream(filePath),
    });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("❌ Error in album reply:", err);
    message.reply("❌ Failed to process reply.");
  }
}

export async function onCall({ message }) {
  try {
    const categoryList = Object.keys(categories);
    const menu = categoryList.map((cat, i) => `${i + 1}. ${cat.toUpperCase()}`).join("\n");
    const msg = await message.reply(`📁 Choose category:\n\n${menu}\n\n👉 Reply with a number`);

    return msg.addReplyEvent({
      callback: handleReply,
      eventData: {
        author: message.senderID,
        categoryList,
      },
    });
  } catch (err) {
    console.error("❌ Error in album command:", err);
    message.reply("❌ Something went wrong.");
  }
}

export default {
  config,
  onCall,
};
