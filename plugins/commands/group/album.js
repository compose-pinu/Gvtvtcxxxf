export const config = {
  name: "album",
  aliases: ["albm"],
  description: "Get album list from the public API",
  usage: "[no args]",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "XaviaTeam"
};

export const langData = {
  "en_US": {
    fetch_error: "❌ Failed to fetch album data from the API.",
    error: "❌ An error occurred: {error}",
    album_list: "🎵 Album Categories:\n\n"
  },
  "bn_BD": {
    fetch_error: "❌ API থেকে অ্যালবাম লোড করতে ব্যর্থ।",
    error: "❌ একটি ত্রুটি ঘটেছে: {error}",
    album_list: "🎵 অ্যালবাম ক্যাটাগরি:\n\n"
  }
};

export async function onCall({ message, api, getLang }) {
  const lang = getLang();

  try {
    if (!api || !api.sendMessage) {
      console.error("❌ api.sendMessage is not available");
      return;
    }

    const res = await fetch("https://album-api-37yu.onrender.com/albums");

    if (!res.ok) {
      return api.sendMessage(lang.fetch_error, message.threadID, message.messageID);
    }

    const albums = await res.json();

    let reply = lang.album_list;
    for (const [category, videos] of Object.entries(albums)) {
      reply += `📂 ${category} - ${videos.length} videos\n`;
    }

    api.sendMessage(reply, message.threadID, message.messageID);
  } catch (err) {
    console.error("Fetch error:", err);
    api.sendMessage(
      lang.error.replace("{error}", err.message),
      message.threadID,
      message.messageID
    );
  }
}
