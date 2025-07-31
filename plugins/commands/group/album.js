import axios from "axios";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";

export const config = {
  name: "album",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Send random video from selected album category",
  category: "media",
  usePrefix: true,
  cooldown: 5,
};

export async function onCall({ message, reply, args }) {
  try {
    const categoryNumber = parseInt(args[0], 10);
    if (isNaN(categoryNumber) || categoryNumber < 1) {
      return reply("❌ Please provide a valid category number. Example: /album 1");
    }

    // Fetch all albums
    const res = await axios.get("https://album-api-37yu.onrender.com");
    const data = res.data;
    const categories = Object.keys(data);

    if (categoryNumber > categories.length) {
      return reply("❌ Invalid category number. Please check /albums.");
    }

    const selectedCategory = categories[categoryNumber - 1];
    const videos = data[selectedCategory];

    if (!Array.isArray(videos) || videos.length === 0) {
      return reply("❌ No videos found in this category.");
    }

    const videoUrl = videos[Math.floor(Math.random() * videos.length)];
    if (!videoUrl.startsWith("http")) {
      return reply("❌ Invalid video URL.");
    }

    // Download video temporarily
    const ext = path.extname(videoUrl).split("?")[0] || ".mp4";
    const tempFilePath = path.join(tmpdir(), `${uuidv4()}${ext}`);

    const videoRes = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
    });

    const writer = fs.createWriteStream(tempFilePath);
    videoRes.data.pipe(writer);

    writer.on("finish", () => {
      message.reply(
        {
          body: `🎞️ Category: ${selectedCategory}`,
          attachment: fs.createReadStream(tempFilePath),
        },
        () => {
          fs.unlinkSync(tempFilePath);
        }
      );
    });

    writer.on("error", () => {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return reply("❌ Failed to download the video.");
    });
  } catch (error) {
    console.error("Album command error:", error);
    reply("❌ Failed to fetch or send video. Please try again later.");
  }
}
