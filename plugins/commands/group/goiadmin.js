const config = {
  name: "goiadmin",
  version: "1.0.0",
  author: "SK-SIDDIK-KHAN",
  role: 0,
  shortDescription: "Responds when someone mentions the admin",
  longDescription: "Sends funny replies if someone mentions the admin while he's busy.",
  category: "awto",
  usePrefix: false,
  guide: "{pn}"
};

const langData = {};

async function onCall({ message, event, api }) {
  const ownerID = "100080363541272";

  // Avoid self-trigger
  if (event.senderID === ownerID) return;

  // Check if mentions exist and is valid
  if (!event?.mentions || typeof event.mentions !== "object") return;

  const mentionedIDs = Object.keys(event.mentions);
  if (!mentionedIDs.includes(ownerID)) return;

  const messages = [
    "Don't Mention My Owner, Busy Right Now 💞",
    "আমার বস চিপায় বিজি আছে___🌝",
    "মেয়ে পটাতে গেছে___😁",
    "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও__🙈",
    "এত ডাকিস কেন__😡\nআমার বস অনেক বিজি__☺️",
    "বস কই তুমি\nতোমারে এক বলদে খুঁজ করে__🤣"
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  try {
    await api.sendMessage(randomMsg, event.threadID, event.messageID);
  } catch (err) {
    console.error("❌ Failed to send goiadmin message:", err);
  }
}

export default {
  config,
  langData,
  onCall
};
