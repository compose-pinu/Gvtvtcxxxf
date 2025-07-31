import axios from "axios";

const config = {
  name: "inbox",
  version: "1.0.1",
  aliases: ["INBOX", "In"],
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  usePrefix: true, 
  category: "system",
  usages: "user",
  cooldowns: 5,
  dependencies: {
    axios: ""
  }
};

async function onCall({ api, event, args }) {
  try {
    const query = encodeURIComponent(args.join(" "));

    await api.sendMessage(
      "✅ SUCCESSFULLY SEND MSG\n\n🔰 PLEASE CHECK YOUR INBOX OR MESSAGE REQUEST BOX ✅",
      event.threadID
    );

    await api.sendMessage(
      "✅ SUCCESSFULLY ALLOWED\n🔰 NOW YOU CAN USE  SIDDIK-BOT HERE 😘✅",
      event.senderID
    );
  } catch (error) {
    console.error("Error bro: " + error);
  }
}

export default {
  config,
  onCall
};
