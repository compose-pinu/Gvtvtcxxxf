const config = {
  name: "inbox",
  version: "1.0.1",
  aliases: ["INBOX", "Inbox"],
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Send inbox confirmation messages",
  usePrefix: true,
  category: "system",
  usages: "user",
  cooldowns: 5
};

async function onCall(data = {}) {
  // Try to find api and event info safely
  const api = data.api || data.message?.api;
  const event = data.event || data.message || {};
  const threadID = event.threadID;
  const senderID = event.senderID;

  if (!api || typeof api.sendMessage !== "function") {
    console.error("❌ api.sendMessage not found");
    return;
  }
  if (!threadID || !senderID) {
    console.error("❌ threadID or senderID missing");
    return;
  }

  try {
    await api.sendMessage(
      "✅ SUCCESSFULLY SENT MSG\n\n🔰 PLEASE CHECK YOUR INBOX OR MESSAGE REQUEST BOX ✅",
      threadID
    );

    await api.sendMessage(
      "✅ SUCCESSFULLY ALLOWED\n🔰 NOW YOU CAN USE SIDDIK-BOT HERE 😘✅",
      senderID
    );
  } catch (error) {
    console.error("Error sending messages:", error);
  }
}

export default {
  config,
  onCall
};
