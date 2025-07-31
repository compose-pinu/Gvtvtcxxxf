import axios from "axios";
import fs from "fs";
import path from "path";

export const config = {
  name: "album",
  version: "1.0.1",
  credits: "DS NAYEM",
  description: "Send random video from selected album category",
  category: "media",
  usages: "/album",
  cooldowns: 5,
};

export async function onCall({ message, getLang }) {
  try {
    const res = await axios.get("https://album-api-37yu.onrender.com/albums");
    const albums = res.data;

    const keys = Object.keys(albums).filter(key => Array.isArray(albums[key]) && albums[key].length > 0);

    if (keys.length === 0) {
      return message.reply("❌ No available albums with videos.");
    }

    let listText = "🎵 Select a category:\n\n";
    keys.forEach((key, index) => {
      listText += `${index + 1}. ${key}\n`;
    });
    listText += "\nReply with the number of the category you want to get a random video from.";

    return message.reply(listText, (err, info) => {
      global.replyHandler[info.messageID] = {
        command: config.name,
        author: message.senderID,
        albums
      };
    });
  } catch (err) {
    console.error("API Error:", err.message);
    return message.reply("❌ Failed to fetch album list. Try again later.");
  }
}

export async function onReply({ message, eventData }) {
  const { albums } = eventData;
  const index = parseInt(message.body) - 1;
  const categories = Object.keys(albums).filter(key => Array.isArray(albums[key]) && albums[key].length > 0);

  if (isNaN(index) || index < 0 || index >= categories.length) {
    return message.reply("❌ Invalid category number.");
  }

  const category = categories[index];
  const videos = albums[category];

  if (!videos || videos.length === 0) {
    return message.reply("❌ No videos in this category.");
  }

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  if (!randomVideo || !randomVideo.startsWith("http")) {
    return message.reply("❌ Invalid video URL received from API.");
  }

  const cachePath = path.join(global.cachePath, `album_video_${Date.now()}.mp4`);

  try {
    await downloadFile(randomVideo, cachePath);

    await message.reply({
      body: `🎬 Here's a random video from ${category}`,
      attachment: fs.createReadStream(cachePath)
    });
  } catch (err) {
    console.error("Video download error:", err.message);
    return message.reply("❌ Failed to download video.");
  } finally {
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
  }
}

async function downloadFile(url, outputPath) {
  const response = await axios({
    method: "GET",
    url,
    responseType: "stream"
  });

  const writer = fs.createWriteStream(outputPath);
  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
