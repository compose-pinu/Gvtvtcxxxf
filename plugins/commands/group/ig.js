// plugins/commands/group/ig.js
import axios from "axios";

const config = {
  name: "ig",
  description: "Send a quote with an image when user sends '/'",
  usage: "/",
  cooldown: 5,
  credits: "YourName",
};

async function sendQuoteWithImage(api, event) {
  try {
    const { threadID, messageID } = event;

    const quoteText = "Islamic New Year Mubarak! 🌙✨";
    const imageUrl = "https://i.postimg.cc/3RrJGf7h/top-view-islamic-new-year-concept.jpg";

    // ছবি ডাউনলোড করা
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");

    // ছবি এবং কোট সহ মেসেজ পাঠানো
    await api.sendMessage(
      {
        caption: quoteText,
        attachment: buffer,
      },
      threadID,
      messageID
    );
  } catch (error) {
    console.error("sendQuoteWithImage error:", error);
    api.sendMessage("Error sending quote with image.", event.threadID, event.messageID);
  }
}

export { sendQuoteWithImage, config };
