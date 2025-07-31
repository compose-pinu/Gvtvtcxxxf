export const config = {
  name: "album",
  version: "1.0.0",
  credits: "DS NAYEM",
  description: "Send a random video from selected album category",
  category: "media",
  usages: "/album [page]",
  cooldowns: 5,
};

const PAGE_SIZE = 3;

const categories = {
  funny: [
    "https://i.imgur.com/3EXzdzu.mp4",
    "https://i.imgur.com/elsJxEk.mp4",
  ],
  romantic: [
    "https://i.imgur.com/UtKEhr0.mp4",
    "https://i.imgur.com/iIaWTaC.mp4",
  ],
  sad: [
    "https://i.imgur.com/gxEZBV3.mp4",
    "https://i.imgur.com/922SK6n.mp4",
  ],
  // add more categories if you want
};

export async function onCall({ message, args, api }) {
  try {
    const categoryKeys = Object.keys(categories);
    let page = 1;

    if (args.length > 0) {
      const inputPage = parseInt(args[0], 10);
      if (!isNaN(inputPage) && inputPage > 0) {
        page = inputPage;
      }
    }

    const totalPages = Math.ceil(categoryKeys.length / PAGE_SIZE);
    if (page > totalPages) {
      return message.reply(`❌ Page ${page} doesn't exist. Total pages: ${totalPages}`);
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const currentPageCategories = categoryKeys.slice(startIndex, endIndex);

    let menuMsg =
      `╭╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓-𝟎𝟕♡━|╾╮\n\n` +
      `আপনার পছন্দের ভিডিও দেখতে একটি নাম্বারে রিপ্লাই করুন:\n\n` +
      `╰╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓-𝟎𝟕♡━|╾╯\n` +
      `┏━━━━━━━━━━━━━━━━━┓\n` +
      currentPageCategories
        .map((cat, i) => `┣➤ ${startIndex + i + 1}. ${cat.toUpperCase()}`)
        .join("\n") +
      `\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━┛\n` +
      `\n☽━━━━━━━━━━━━━━━━━━☾\n           🔰 | 𝐏𝐚𝐠𝐞 [ ${page} / ${totalPages} ] 🔰\n☽━━━━━━━━━━━━━━━━━━☾`;

    const sent = await message.reply(menuMsg);

    sent.addReplyEvent({
      author: message.senderID,
      callback: async ({ message }) => {
        const selected = message.body?.trim();
        const selectedIndex = parseInt(selected, 10);

        if (
          isNaN(selectedIndex) ||
          selectedIndex < 1 ||
          selectedIndex > categoryKeys.length
        ) {
          return message.reply(`❌ Invalid selection. Please reply with a number between 1 and ${categoryKeys.length}.`);
        }

        const categoryName = categoryKeys[selectedIndex - 1];
        const links = categories[categoryName];
        const randomVideo = links[Math.floor(Math.random() * links.length)];

        try {
          // Safe api fallback
          const sendApi = api || message.api || global.api;
          if (!sendApi || typeof sendApi.sendMessage !== "function") {
            return message.reply("❌ Bot API is not available.");
          }

          await sendApi.sendMessage(
            {
              body: `🎬 Here's your video from '${categoryName}' category`,
              attachment: randomVideo,
            },
            message.threadID,
            null,
            message.messageID
          );
        } catch (err) {
          console.error("Telegram sendMessage error:", err);
          return message.reply("❌ Failed to send video. Try again.");
        }
      },
    });
  } catch (error) {
    console.error("Command error:", error);
    return message.reply("❌ Something went wrong. Please try again later.");
  }
}
