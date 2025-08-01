export default {
  config: {
    name: "goiadmin",
    author: "SK-SIDDIK-KHAN",
    role: 0,
    shortDescription: "Responds when someone mentions the admin",
    longDescription: "Sends funny replies if someone mentions the admin while he's busy.",
    category: "awto",
    guide: "{pn}"
  },

  onCall({ api, event }) {
    // Loader requires this; we don't use it further here
  },

  onChat({ api, event }) {
    const ownerID = "100080363541272";

    // যদি sender একই ownerID হয় → কিছু না করো
    if (event.senderID === ownerID) return;

    const mentionedIDs = Object.keys(event.mentions || {});

    // যদি message-এ ownerID মেনশন থাকে:
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

      // একবার রেসপন্স দিবে, তার পর আর রিপ্লাই করবে না
      return api.sendMessage(randomMsg, event.threadID, event.messageID);
    }

    // অন্য কোনো মডিউল বা অনুমোদিত লজিক না বললে কিছু না করবে
  },

  async onStart() {
    // Initialization বা অন্য কিছু দরকার হলে এখানে লেখো
  }
};
