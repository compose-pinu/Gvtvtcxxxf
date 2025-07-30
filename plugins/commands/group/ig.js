import axios from "axios";

async function sendQuoteWithImage(api, event) {
  try {
    const imageUrl = "https://i.postimg.cc/3RrJGf7h/top-view-islamic-new-year-concept.jpg";
    const quoteText = "Islamic New Year Mubarak! 🌙✨";

    // Image ডাউনলোড করে buffer আকারে নিয়ে আসা
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "utf-8");

    // Telegram এ মেসেজ পাঠানো
    await api.sendMessage(
      {
        caption: quoteText,
        attachment: buffer,
      },
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error("sendQuoteWithImage error:", error);
    api.sendMessage("Error sending image.", event.threadID, event.messageID);
  }
}

const config = {
  name: "ig",
  description: "Send a quote with an image when user sends '/'",
  usage: "/",
  cooldown: 5,
  credits: "DS NAYEM",
};

async function onCall({ api, event }) {
  const body = event.body?.trim();
  if (body === "/") {
    await sendQuoteWithImage(api, event);
  }
}

export { config, onCall, sendQuoteWithImage };
