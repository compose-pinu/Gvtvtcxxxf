import axios from "axios";

const config = {
  name: "ig",
  description: "Send a quote with an image when user sends '/'",
  usage: "/",
  cooldown: 5,
  credits: "YourName",
};

async function onCall({ api, event }) {
  try {
    const { threadID, messageID, body } = event;
    if (body?.trim() === "/") {
      const imageUrl = "https://i.postimg.cc/3RrJGf7h/top-view-islamic-new-year-concept.jpg";
      const quoteText = "Islamic New Year Mubarak! 🌙✨";

      // ছবি ডাউনলোড
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "utf-8");

      // ছবি + কোট পাঠাও
      await api.sendMessage(
        {
          caption: quoteText,
          attachment: buffer,
        },
        threadID,
        messageID
      );
    }
  } catch (error) {
    console.error("ig onCall error:", error);
    api.sendMessage("Error sending image.", event.threadID, event.messageID);
  }
}

export { config, onCall };
