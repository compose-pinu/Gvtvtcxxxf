import axios from "axios";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";

export const config = { name: "album", version: "1.0.0" };

export async function onCall({ message, api }) {
  try {
    const res = await axios.get("https://album-api-37yu.onrender.com/albums");
    const data = res.data;
    const categories = Object.keys(data).filter(
      key => Array.isArray(data[key]) && data[key].length > 0
    );

    if (!categories.length) {
      return api.sendMessage("❌ কোনো ভিডিও ক্যাটেগরি পাওয়া যায়নি।", message.threadID, message.messageID);
    }

    const listText = "📂 ক্যাটেগরি নির্বাচন করো:\n\n" +
      categories.map((c, i) => `${i + 1}. ${c} (${data[c].length} videos)`).join("\n") +
      "\n\nReply with number.";

    api.sendMessage(listText, message.threadID, (err, info) => {
      global.replyHandler[info.messageID] = {
        author: message.senderID,
        categories,
        albumData: data,
        command: config.name
      };
    }, message.messageID);

  } catch (err) {
    console.error("API fetch error:", err);
    api.sendMessage("❌ API থেকে ক্যাটেগরি ফেচ করা যায়নি।", message.threadID, message.messageID);
  }
}

export async function onReply({ message, api, eventData }) {
  try {
    const input = (message.body || '').trim();
    const idx = parseInt(input) - 1;
    const cats = eventData.categories;

    if (isNaN(idx) || idx < 0 || idx >= cats.length) {
      return api.sendMessage("❌ ভুল নম্বর দিয়েছেন, আবার চেষ্টা করুন।", message.threadID, message.messageID);
    }

    const cat = cats[idx];
    const urls = eventData.albumData[cat];

    if (!Array.isArray(urls) || urls.length === 0) {
      return api.sendMessage("❌ ভিডিও পাওয়া যায়নি এই ক্যাটেগরিতে।", message.threadID, message.messageID);
    }

    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    console.log("🎯 Random URL:", randomUrl);

    if (!randomUrl || typeof randomUrl !== "string" || !randomUrl.startsWith("http")) {
      return api.sendMessage("❌ Invalid video URL পাওয়া গেছে।", message.threadID, message.messageID);
    }

    const ext = path.extname(randomUrl).split("?")[0] || ".mp4";
    const tmpPath = path.join(tmpdir(), uuidv4() + ext);

    const resp = await axios.get(randomUrl, { responseType: 'stream' });
    const ws = fs.createWriteStream(tmpPath);
    resp.data.pipe(ws);

    ws.on("finish", () => {
      api.sendMessage({
        body: `🎬 Video from ${cat}`,
        attachment: fs.createReadStream(tmpPath)
      }, message.threadID, (err, info) => {
        fs.unlinkSync(tmpPath);
      }, message.messageID);
    });

    ws.on("error", (err) => {
      console.error("Write error:", err);
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      api.sendMessage("❌ ভিডিও পাঠানো হয়নি।", message.threadID, message.messageID);
    });

  } catch (err) {
    console.error("onReply error:", err);
    api.sendMessage("❌ ভিডিও লোড করতে ব্যর্থ।", message.threadID, message.messageID);
  }
}
