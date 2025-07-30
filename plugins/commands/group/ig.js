import fs from "fs-extra";
import path from "path";
import request from "request";

export const config = {
  name: "ig",
  version: "9.9.9",
  author: "SK-SIDDIK-KHAN",
  countDown: 5,
  role: 0,
  category: "fun",
  usePrefix: false // or true if you want prefix-based trigger
};

const quotes = [
  // (All your quotes here — you can copy paste from your original list)
  "আপনি কত শিক্ষিত তা গুরুত্বপূর্ণ নয়, আপনার চরিত্র কতো উন্নত তাই বেশী গুরুত্বপূর্ণ",
  // ...
  "সুন্দর চেহারা নিয়ে অহংকার করো না। তোমার মৃত্যুর পর যে তোমাকে ছোঁবে সেও স্থান করে নেবে।"
];

const images = [
  // (All your image URLs here)
  "https://i.postimg.cc/N0H0Y2Dh/3d-rendering-islamic-pilgrimage-mosque-437476-72.webp",
  // ...
  "https://i.postimg.cc/6q3gJgJM/pexels-fuzail-ahmad-2344997.jpg"
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomImageURL() {
  return images[Math.floor(Math.random() * images.length)];
}

async function downloadImage(url, dest) {
  await fs.ensureDir(path.dirname(dest));
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(dest))
      .on("finish", resolve)
      .on("error", reject);
  });
}

export async function onCall({ api, event }) {
  try {
    const quote = getRandomQuote();
    const imageUrl = getRandomImageURL();
    const imgPath = path.join(__dirname, "cache", `ig_img_${Date.now()}.jpg`);

    await downloadImage(imageUrl, imgPath);

    api.sendMessage(
      {
        body: quote,
        attachment: fs.createReadStream(imgPath)
      },
      event.threadID,
      () => {
        try {
          fs.unlinkSync(imgPath);
        } catch (e) {
          // ignore unlink errors
        }
      }
    );
  } catch (error) {
    api.sendMessage("দুঃখিত, ইমেজ লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID);
  }
}
