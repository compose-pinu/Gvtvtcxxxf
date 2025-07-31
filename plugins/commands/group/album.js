import axios from "axios";

export const config = {
  name: "albums",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Show album categories from API",
  category: "media",
  usePrefix: true,
  cooldown: 5,
};

export async function onCall({ message, reply, userID }) {
  try {
    const res = await axios.get("https://album-api-37yu.onrender.com");
    const data = res.data;

    if (!data || typeof data !== "object") {
      return reply("❌ Failed to fetch album data.");
    }

    const categories = Object.keys(data);
    if (categories.length === 0) {
      return reply("❌ No album categories found.");
    }

    let listText = "📂 Available Album Categories:\n\n";
    categories.forEach((cat, i) => {
      listText += `${i + 1}. ${cat}\n`;
    });
    listText += "\n👉 Reply with a number using /album command to get a video.";

    reply(listText);
  } catch (error) {
    console.error("Albums command error:", error);
    reply("❌ Failed to fetch album data. Please try again later.");
  }
}
