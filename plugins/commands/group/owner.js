const img = `https://graph.facebook.com/100059026788061/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

export default {
  config: {
    name: "info",
    version: "1.0",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 0,
    shortDescription: "Show admin info",
    longDescription: "Displays information about the bot owner/admin",
    category: "general",
  },

  onCall: async function ({ message }) {
    try {
      const currentDate = new Date();
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true,
      });

      const msg = `╭────────────────⊙
├─☾ 𝙰𝚂𝚂𝙰𝙻𝙰𝙼𝚄 𝚆𝙰𝙻𝙰𝙸𝙺𝚄𝙼 
├─☾ 𝙰𝙳𝙼𝙸𝙽 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽
├─☾ 𝙽𝙰𝙼𝙴𝚂 : 𝚂𝙺 𝚂𝙸𝙳𝙳𝙸𝙺 𝙺𝙷𝙰𝙽
├─☾ 𝙰𝙳𝙳𝚁𝙴𝚂𝚂 : 𝚁𝙰𝙹𝚂𝙷𝙰𝙷𝙸
├─☾ 𝙲𝙾𝙽𝚃𝙰𝙲𝚃
├─☾ 𝙵𝙱 : 𝚃𝙰𝙽𝙹𝙸𝙳 𝙷𝙰𝚂𝙰𝙽 𝚃𝙰𝙼𝙸𝙼
├─☾ 𝚃𝙶 : t.me/rdxprem12
├─☾ 𝙱𝙾𝚃 𝙿𝚁𝙴𝙵𝙸𝚇 : [ / ]
├─☾ 𝙱𝙾𝚃 𝙽𝙰𝙼𝙴 : 𝚂𝙺_𝚂𝙸𝙳𝙳𝙸𝙺_𝟶𝟽
├─☾ 𝚃𝙸𝙼𝙴𝚂 : ${time} 
├─☾ 𝚃𝙷𝙰𝙽𝙺𝚂 𝙵𝙾𝚁 𝚄𝚂𝙸𝙽𝙶
╰────────────────⊙`;

      await message.send({
        body: msg,
        attachment: await global.utils.getStreamFromURL(img)
      });

    } catch (e) {
      console.error("❌ info.js error:", e);
      message.send("⚠️ Something went wrong while sending info.");
    }
  }
};
