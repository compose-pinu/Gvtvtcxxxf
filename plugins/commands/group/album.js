import fetch from "node-fetch"; // যদি Node.js < 18 হয়, আর না হলে বাদ দিতে পারো

const config = {
  name: "album",
  aliases: ["albm"],
  description: "Get album list from API",
  usage: "[no args]",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "XaviaTeam"
};

const langData = {
  en: {
    fetch_error: "❌ Failed to fetch albums from API.",
    error: "❌ Error: {error}",
    album_list: "🎵 Album Categories:\n\n"
  }
};

async function onCall({ message, api, getLang }) {
  try {
    const res = await fetch("https://album-api-37yu.onrender.com/albums");
    if (!res.ok) {
      return api.sendMessage(getLang("fetch_error"), message.threadID, message.messageID);
    }
    const albums = await res.json();

    let reply = getLang("album_list");
    for (const [category, videos] of Object.entries(albums)) {
      reply += `📂 ${category} - ${videos.length} videos\n`;
    }

    api.sendMessage(reply, message.threadID, message.messageID);
  } catch (err) {
    api.sendMessage(getLang("error").replace("{error}", err.message), message.threadID, message.messageID);
  }
}

export default {
  config,
  langData,
  onCall
};
