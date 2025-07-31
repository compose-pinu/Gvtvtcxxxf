import axios from 'axios';
import fs from 'fs';
import path from 'path';

const config = {
  name: "album",
  aliases: ["albm"],
  version: "1.0.0",
  description: "Send random video from selected album category",
  usage: "[no args]",
  cooldown: 5,
  permissions: [0, 1, 2],
  credits: "DS NAYEM"
};

const langData = {
  "en_US": {
    "album.choose": "📂 Choose a category to get a random video (reply with number):",
    "album.error": "❌ Failed to fetch video. {error}",
    "album.no_album": "❌ No albums found.",
    "album.fetch_fail": "❌ Failed to fetch albums.",
    "album.unsupported": "❌ No videos found in this album."
  }
};

async function getAlbums() {
  const res = await axios.get("https://album-api-37yu.onrender.com/albums");
  return res.data;
}

async function downloadFile(url, filePath) {
  const writer = fs.createWriteStream(filePath);
  const res = await axios({ url, method: 'GET', responseType: 'stream' });
  res.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
}

async function handleReply({ message, eventData, getLang }) {
  const { albums, selectedCategory } = eventData;
  const index = parseInt(message.body) - 1;

  if (isNaN(index) || index < 0 || index >= albums.length)
    return message.reply(getLang("album.no_album"));

  const category = Object.keys(albums)[index];
  const videos = albums[category];

  if (!videos || videos.length === 0)
    return message.reply(getLang("album.unsupported"));

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  const videoUrl = randomVideo.url;
  const cachePath = path.join(global.cachePath, `album_video_${Date.now()}.mp4`);

  try {
    await downloadFile(videoUrl, cachePath);
    await message.reply({
      body: `🎬 Random video from ${category}`,
      attachment: fs.createReadStream(cachePath)
    });
  } catch (err) {
    console.error(err);
    message.reply(getLang("album.error").replace("{error}", err.message));
  } finally {
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
  }
}

async function onCall({ message, getLang }) {
  try {
    const albums = await getAlbums();
    const keys = Object.keys(albums);

    if (!keys.length) return message.reply(getLang("album.no_album"));

    const list = keys.map((cat, i) => `${i + 1}. ${cat} (${albums[cat].length} videos)`).join("\n");
    const replyMsg = await message.reply(`${getLang("album.choose")}\n\n${list}`);

    replyMsg.addReplyEvent({
      callback: handleReply,
      albums
    });
  } catch (err) {
    console.error(err);
    message.reply(getLang("album.fetch_fail"));
  }
}

export default {
  config,
  langData,
  onCall
};
