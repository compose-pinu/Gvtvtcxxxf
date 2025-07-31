export const config = {
  name: "goiadmin",
  version: "1.0.0",
  author: "SK-SIDDIK-KHAN",
  permission: 0,
  usePrefix: false,
  category: "awto",
};

export async function onCall({ message, event, api }) {
  const ownerID = "100080363541272";

  if (event.senderID === ownerID) return;

  if (!event.mentions || typeof event.mentions !== 'object') return;

  const mentionedIDs = Object.keys(event.mentions);
  if (mentionedIDs.includes(ownerID)) {
    const messages = [
      "Don't Mention My Owner, Busy Right Now 💞",
      "আমার বস চিপায় বিজি আছে___🌝",
      "মেয়ে পটাতে গেছে___😁",
      "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও__🙈",
      "এত ডাকিস কেন__😡\nআমার বস অনেক বিজি__☺️",
      "বস কই তুমি\nতোমারে এক বলদে খুঁজ করে__🤣"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    return api.sendMessage(randomMsg, event.threadID, event.messageID);
  }
}
