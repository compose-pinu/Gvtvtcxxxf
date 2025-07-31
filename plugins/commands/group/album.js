import fs from "fs";
import path from "path";
import https from "https";

export const config = {
  name: "album",
  version: "1.0.0",
  permissions: [0],
  credits: "SK-SIDDIK-KHAN",
  description: "ভিডিও অ্যালবাম থেকে ভিডিও পাঠান",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

const PAGE_SIZE = 11;

const categories = {
  "ISLAMIC-VIDEO": [
    "https://i.imgur.com/3EXzdzu.mp4",
    "https://i.imgur.com/elsJxEk.mp4",
    "https://i.imgur.com/htitv6P.mp4",
    "https://i.imgur.com/iD8lpOs.mp4",
    "https://i.imgur.com/PjTN0I5.mp4",
    "https://i.imgur.com/hzFQ4Xu.mp4",
    "https://i.imgur.com/8WojIf7.mp4",
    "https://i.imgur.com/guefl5P.mp4",
    "https://i.imgur.com/7zFKSsJ.mp4",
    "https://i.imgur.com/5Vys7Eb.mp4",
    "https://i.imgur.com/B6fu243.mp4",
    "https://i.imgur.com/53dHYJM.mp4",
    "https://i.imgur.com/pCWDq0c.mp4",
    "https://i.imgur.com/bytY1SY.mp4",
    "https://i.imgur.com/oWZkJ7b.mp4",
    "https://i.imgur.com/P8aujG8.mp4",
    "https://i.imgur.com/g0Fj7Ch.mp4",
    "https://i.imgur.com/nE1Z3kz.mp4",
    "https://i.imgur.com/AxnZq05.mp4",
    "https://i.imgur.com/sXYLgUB.mp4",
    "https://i.imgur.com/JjFKInj.mp4",
    "https://i.imgur.com/2OqRU40.mp4",
    "https://i.imgur.com/uRQGaK6.mp4",
    "https://i.imgur.com/3Hp0Oxy.mp4",
    "https://i.imgur.com/0Sqtett.mp4",
    "https://i.imgur.com/uZI7DXV.mp4",
    "https://i.imgur.com/soL5Jxy.mp4",
    "https://i.imgur.com/Rr2tG0T.mp4",
    "https://i.imgur.com/cNJ5j47.mp4",
    "https://i.imgur.com/OVwJaDx.mp4",
    "https://i.imgur.com/EXGhWrC.mp4",
    "https://i.imgur.com/2JvDA4e.mp4",
    "https://i.imgur.com/ZWVwq1l.mp4",
    "https://i.imgur.com/FpuexGp.mp4",
    "https://i.imgur.com/Ew7CvTt.mp4",
    "https://i.imgur.com/V0OqX8g.mp4",
    "https://i.imgur.com/JmUDnqb.mp4",
    "https://i.imgur.com/FUnr5qQ.mp4",
    "https://i.imgur.com/AQwbIOr.mp4",
    "https://i.imgur.com/Tmt0IGj.mp4",
    "https://i.imgur.com/v0I3a1W.mp4",
    "https://i.imgur.com/Ai6RzC5.mp4",
    "https://i.imgur.com/cLbms2h.mp4",
    "https://i.imgur.com/WVitFo7.mp4",
    "https://i.imgur.com/tl5pUKV.mp4",
    "https://i.imgur.com/MqwgGtt.mp4",
    "https://i.imgur.com/xeZsWGT.mp4",
    "https://i.imgur.com/ggaGB0v.mp4",
    "https://i.imgur.com/qTSRbNF.mp4",
    "https://i.imgur.com/d8GRdba.mp4",
    "https://i.imgur.com/6J5V9qA.mp4",
    "https://i.imgur.com/W2tlljJ.mp4",
    "https://i.imgur.com/Bma5E6H.mp4",
    "https://i.imgur.com/zJO00lU.mp4",
    "https://i.imgur.com/iK7HgGJ.mp4",
    "https://i.imgur.com/AGgrxCv.mp4",
    "https://i.imgur.com/fxYQOh3.mp4",
    "https://i.imgur.com/lMtE97b.mp4",
    "https://i.imgur.com/W7Sl7Lg.mp4",
    "https://i.imgur.com/wVkIgip.mp4",
    "https://i.imgur.com/rKPBWbh.mp4",
    "https://i.imgur.com/JaZUUm9.mp4",
    "https://i.imgur.com/IlxXBo3.mp4",
    "https://i.imgur.com/ho6L4po.mp4",
    "https://i.imgur.com/AxqytnF.mp4"
  ]
};

export async function onCall({ message, args, event, api }) {
  const categoryKeys = Object.keys(categories);
  let page = 1;

  if (args[0]) {
    const inputPage = parseInt(args[0]);
    if (!isNaN(inputPage) && inputPage > 0) page = inputPage;
  }

  const totalPages = Math.ceil(categoryKeys.length / PAGE_SIZE);
  if (page > totalPages)
    return message.reply(`❌ Page ${page} doesn't exist. Total pages: ${totalPages}`);

  const startIndex = (page - 1) * PAGE_SIZE;
  const currentCategories = categoryKeys.slice(startIndex, startIndex + PAGE_SIZE);

  const listMsg = currentCategories
    .map((cat, i) => `┣➤ ${startIndex + i + 1}. ${cat.toUpperCase()}`)
    .join("\n");

  const msg = `╭╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓♡━|╾╮\n\n` +
              `আপনার পছন্দের ভিডিও দেখতে একটি নাম্বারে রিপ্লাই করুন:\n\n` +
              `╰╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓♡━|╾╯\n` +
              `┏━━━━━━━━━━━━━━━━━┓\n${listMsg}\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━┛\n\n` +
              `☽━━━━━━━━━━━━━━━━━━☾\n           🔰 | 𝐏𝐚𝐠𝐞 [ ${page} / ${totalPages} ] 🔰\n☽━━━━━━━━━━━━━━━━━━☾`;

  message.reply({ body: msg }, async (err, replyMsg) => {
    if (err) return;

    global.xaviaBot.onReply.set(replyMsg.messageID, {
      command: config.name,
      author: event.senderID,
      type: "selectCategory"
    });

    setTimeout(() => {
      api.unsendMessage(replyMsg.messageID).catch(() => {});
    }, 30000);
  });
}

export async function onReply({ message, event, Reply }) {
  if (Reply.author !== event.senderID)
    return message.reply("⚠️ Only the original user can select a category.");

  const categoryKeys = Object.keys(categories);
  const choice = parseInt(event.body.trim());

  if (isNaN(choice) || choice < 1 || choice > categoryKeys.length) {
    return message.reply("❌ Invalid number, please select a valid category number.");
  }

  const selectedCategory = categoryKeys[choice - 1];
  const videoURL = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)];
  const fileName = path.basename(videoURL);
  const filePath = path.join(process.cwd(), "cache", "album", fileName);

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const loadingMsg = await message.reply(`⏳ Downloading ${selectedCategory.toUpperCase()}...`);

  try {
    if (!fs.existsSync(filePath)) await downloadFile(filePath, videoURL);

    await message.reply({
      body: `✅ Here's your ${selectedCategory.toUpperCase()} video`,
      attachment: fs.createReadStream(filePath)
    });

    message.unsend(loadingMsg.messageID);
  } catch (err) {
    console.error(err);
    message.reply("❌ Failed to download or send the video.");
  }
}

function downloadFile(filePath, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

export default {
  config,
  onCall,
  onReply
};
