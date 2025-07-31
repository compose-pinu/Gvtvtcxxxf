import axios from "axios";

const config = {
  name: "album",
  aliases: ["albm"],
  version: "1.0.0",
  description: "Get album list and play random video from a category",
  usage: "[no args]",
  cooldown: 5,
  permissions: [0, 1, 2],
  credits: "DS NAYEM & XaviaTeam"
};

const langData = {
  "en_US": {
    "album.list": "🎵 Available albums:\n\n",
    "album.error": "❌ Error: {error}",
    "album.fetch_fail": "❌ Failed to fetch album list.",
    "album.reply_prompt": "💬 Reply with the category name to get a random video from it.",
    "album.invalid": "❌ Invalid category.",
    "album.sending": "⏳ Sending random video from {name}..."
  }
};

async function onCall({ message, getLang }) {
  try {
    const res = await axios.get("https://album-api-37yu.onrender.com/albums");
    const albums = res.data;

    const categoryList = Object.keys(albums);
    if (!categoryList.length) return message.reply(getLang("album.fetch_fail"));

    const formatted = categoryList.map(cat => `📁 ${cat} (${albums[cat].length} videos)`).join("\n");
    const msg = await message.reply(getLang("album.list") + formatted + "\n\n" + getLang("album.reply_prompt"));

    return msg.addReplyEvent({
      callback: async function handleReply({ message: repMsg, eventData }) {
        const cat = repMsg.body.trim();
        if (!albums[cat]) return repMsg.reply(getLang("album.invalid"));

        const randomVid = albums[cat][Math.floor(Math.random() * albums[cat].length)];
        if (!randomVid?.url) return repMsg.reply(getLang("album.invalid"));

        await repMsg.react("⏳");
        await repMsg.reply(getLang("album.sending").replace("{name}", cat));

        await repMsg.reply({
          body: `${cat} video 🎬`,
          attachment: [await global.utils.getStreamFromURL(randomVid.url)]
        });
        await repMsg.react("✅");
      }
    });

  } catch (err) {
    console.error(err);
    return message.reply(getLang("album.error").replace("{error}", err.message));
  }
}

export default {
  config,
  langData,
  onCall
};
