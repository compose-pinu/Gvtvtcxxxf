const img = `https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

export default {
  config: {
    name: "ownerinfo",
    role: 0,
    category: "admin",
    shortDescription: "Show owner info",
    guide: "{pn}",
  },

  onCall: async function ({ message, args, client }) {
    try {
      const time = new Date().toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });

      const text = `
👑 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 👑
━━━━━━━━━━━━━━━
📛 Name: 𝚂𝙺 𝚂𝙸𝙳𝙳𝙸𝙺 𝙺𝙷𝙰𝙽
📍 Address: Rajshahi
📞 Contact: t.me/rdxprem12
🤖 Bot: SK_SIDDIK_07
📆 Time: ${time}
`;

      // ছবি সহ মেসেজ পাঠানো হচ্ছে
      await client.sendPhoto(message.chat.id, img, { caption: text });
    } catch (error) {
      console.error("Error in ownerinfo command:", error);
    }
  },
};
