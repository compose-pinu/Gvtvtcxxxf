export default {
  config: {
    name: "ownerinfo",
    role: 0,
    category: "admin",
    shortDescription: "Show owner info",
    guide: "{pn}"
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

      await client.sendMessage(message.threadID, { body: text });
    } catch (error) {
      console.error("Error in ownerinfo command:", error);
    }
  }
};
