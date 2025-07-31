import axios from "axios";

export const config = {
  name: "album",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Send a random video from selected album category",
  category: "media",
  usages: "/album",
  cooldowns: 5,
};

const categories = {
  "funny": [
    "https://video.link/funny1.mp4",
    "https://video.link/funny2.mp4"
  ],
  "romantic": [
    "https://video.link/romantic1.mp4",
    "https://video.link/romantic2.mp4"
  ],
  "sad": [
    "https://video.link/sad1.mp4",
    "https://video.link/sad2.mp4"
  ]
};

export async function onCall({ message, api }) {
  const categoryList = Object.keys(categories)
    .map((cat, index) => `${index + 1}. ${cat}`)
    .join("\n");

  const replyMsg = `📂 Choose a category by replying its name:\n\n${categoryList}`;
  const sent = await message.reply(replyMsg);

  sent.addReplyEvent({
    author: message.senderID,
    data: {},
    callback: async ({ message }) => {
      const selected = message.body?.trim().toLowerCase();

      if (!selected || !categories[selected]) {
        return message.reply("❌ Invalid category. Please try `/album` again.");
      }

      const links = categories[selected];
      const randomVideo = links[Math.floor(Math.random() * links.length)];

      await message.reply("⏳ Downloading video...");
      try {
        const res = await axios.get(randomVideo, { responseType: "stream" });
        await api.sendMessage(
          {
            body: `🎬 Here's your video from '${selected}' category`,
            attachment: res.data
          },
          message.threadID,
          null,
          message.messageID
        );
      } catch (err) {
        console.error("Video fetch failed:", err);
        return message.reply("❌ Failed to fetch video. Try again.");
      }
    }
  });
}
