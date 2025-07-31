export const config = {
  name: "idia",
  version: "1.0.0",
  permission: 2,
  credits: "SK-SIDDIK-KHAN",
  description: "একজনকে @ম্যানশন করে তাকে উপদেশ পাঠান",
  category: "admin",
  usages: "please @mention",
  cooldowns: 5,
};

export async function onCall({ message, api = global.api }) {
  try {
    if (!api) return console.error("API not found!");

    const mentions = message.mentions || {};
    const mentionIDs = Object.keys(mentions);
    if (mentionIDs.length === 0) {
      return api.sendMessage("আপনি কাকে জ্ঞান দিতে চান এমন 1 জনকে @ম্যানশন করতে হবে", message.threadID);
    }

    const mentionID = mentionIDs[0];
    const mentionName = mentions[mentionID];

    const arraytag = [{ id: mentionID, tag: mentionName }];

    function sendText(text, delay = 0) {
      return new Promise(resolve => setTimeout(() => {
        api.sendMessage({ body: text, mentions: arraytag }, message.threadID);
        resolve();
      }, delay));
    }

    await sendText("তোমাকে কিছু উপদেশ দেওয়া হবে। মেনে চললে জীবনে অনেক উন্নতি করতে পারবে এবং মরার পর ও ভালো থাকবে।😇", 0);
    await sendText(`বিপদ-আপদের সময়,, দুনিয়ার সকল দরজা বন্ধ হয়ে গেলেও আল্লাহ তায়ালার দরজার সবসময় খুলা থাকে। 🥰🥰। ${mentionName}`, 3000);
    await sendText(`দুনিয়াতে একটি মাত্র ঘর । যার নাম “কাবা ঘর” । যার উপর দিয়ে আজ পর্যন্ত কোন পাখি বা বিমান উড়ে যেতে পারে নি। 😍.. ${mentionName}`, 5000);
    await sendText(`তার জন্য কাঁদ যে তোমার চোখের জল দেখে সেও কেঁদে ফেলে, কিন্তু এমন কারো জন্য কেদোনা যে তোমার চোখের জল দেখে উপহাস করে। 🐰 ${mentionName}`, 7000);
    await sendText(`সবচেয়ে কঠিন কাজ হচ্ছে নিজেকে চেনা এবং সবচেয়ে সহজ কাজ হচ্ছে অন্যদেরকে উপদেশ দেয়া। 💔! ${mentionName}`, 9000);
    await sendText(`প্রেমে ছ্যাকা খাইছেন তাকে ভুলতে পারছেন না? ৫ ওয়াক্ত সালাত আদায় করুন তার প্রতি যে ভালোবাসা ছিলো সেটা আল্লাহর প্রতি স্থাপন করুন।🥰 ${mentionName}`, 12000);
    await sendText(`ডিপ্রেশনে আছেন কোনোভাবে ডিপ্রেশন কাটাতে পারছেন না। ইসলামিক ভিডিও দেখুন ওয়াজ শুনুন মন টাকে ইসলামিক কথার ভিতর নিয়ে যান তাহলে ডিপ্রেশন কেটে যাবে। ${mentionName}`, 15000);
    await sendText(`যাহা তুমি দেখাও, তার চেয়ে বেশি তোমার থাকা উচিত🤬 ${mentionName}`, 17000);
    await sendText(`যা তুমি জান, তার তুলনায় কম কথা বলা উচিত।🤟 ${mentionName}`, 20000);
    await sendText(`বন্ধুত্ব হোক কিংবা ভালোবাসা। টিকিয়ে রাখার দায়িত্ব কিন্তু দু'জনেরই।  🤝 ${mentionName}`, 23000);
    await sendText(`যদি স্বপ্ন দেখতে পারো, তবে তা বাস্তবায়নও করতে পারবে।💉। ${mentionName}`, 25000);
    await sendText(`যে তোমাকে আজ অবহেলা করছে। ধৈর্য ধরো একদিন। তোমাকে তার প্রয়োজন হবেই ${mentionName}`, 28500);
    await sendText(`তাকে ছেড়ে চলে যেও না।💔 যে তোমার শত খারাপ। ব্যবহারের পরেও তোমাকে ছেড়ে যাইনি।😘 ✋ ${mentionName}`, 31000);
    await sendText(` আল্লাহর দেখানো পথে চলুন 🥰 ${mentionName}`, 36000);
    await sendText("~ অন্যকে গালি দেওয়া থেকে বিরত থাকুন♥️", 39000);
    await sendText(`গার্লফ্রেন্ডকে না✌️ নিজের মা বাবাকে ভালোবাসুন✋🥰। ${mentionName}`, 42000);
    await sendText(`নিজের ওপর বিশ্বাস রাখার মানেই একজন মানুষ আত্মবিশ্বাসী।সে বিশ্বাস করে নিজের জন্য সঠিক সিদ্ধান্ত নেয়ার ক্ষমতা তার আছে।😍.. ${mentionName}`, 48000);
    await sendText(`মৃত্যু নিশ্চিত কিন্তু সময় টা অনিশ্চিত.. ইয়া আল্লা্হ! যখনি মৃত্যু দিবা ঈমানী হালতে দিও। 😍🐰 ${mentionName}`, 51000);
    await sendText(`টেনশন দূর করতে। - নেশা নয়। পাঁচ ওয়াক্ত নামাজই যথেষ্ট।💔! ${mentionName}`, 54000);
    await sendText(`তোমার গার্লফ্রেন্ড তোমাকে রেখে বড়লোক ছেলে পেয়ে তোমাকে ছেড়ে চলে গেছে??  তুমি নিজেকে কষ্ট দিচ্ছো?  নেশা করতাছো?? আরে বোকা তুমি নিজেকে এমন ভাবে তৈরি করো যাতে তোমার সেই গার্লফ্রেন্ড তোমাকে দেখে আফসোস করে এবং সে তোমার কাছে ফিরতে আসতে চাই ✌️ ${mentionName}`, 57000);
    await sendText(`১০ টাকার নামাজ শিক্ষার বইয়ে যা আছে, - পৃথিবীর দামী বইয়েও তা নেই😍 ${mentionName}`, 59400);
    await sendText(`দেহের রোগের ঔষধ ফার্মেসিতে থাকলেও। - মনের রোগের ঔষধ আল কোরআনে আছে। ✋ ${mentionName}`, 63000);
    await sendText(`যে ব্যক্তি ধোঁকাবাজি করে।- আমার সাথে তার কোন সম্পর্ক নেই।🤟 ${mentionName}`, 66000);
    await sendText(`হে আল্লাহ মুসলমান যখন বানিয়েছো - ঈমানের সাথে মৃত্যু দিও। ${mentionName}`, 69000);
    await sendText(`হারামের টাকায় টেবিল ভর্তি খাবারের চেয়ে, হালাল টাকার সীমিত খাবারের মজাই আলাদা।💉। ${mentionName}`, 72000);
    await sendText(`দুনিয়াতে সেই সবচেয়ে কৃপন, যে মুসলমান অন্য মুসলমানকে সালাম দিতে কৃপনতা করে। ${mentionName}`, 75000);
    await sendText(`চরিত্রহীন স্বামীর সঙ্গে রাজপ্রসাদে থাকার চেয়ে,,,, দরিদ্র আদর্শবান স্বামীর সঙ্গে কুঁড়েঘরে থাকা অনেক সুখের। 🙂✋ ${mentionName}`, 81000);
    await sendText(` দামি কাপড় পড়ে কি লাভ হবে ! সালাতের জন্য ডাকলে যদি বলতে হয় পোশাক তো এখন নাপাক ♥️ ${mentionName}`, 87000);
    await sendText("~কাউকে অতীতের পাপ নিয়ে খোটা দিও না ! সে হয়তো তওবা করে মহান আল্লাহর কাছে তোমার থেকেও উত্তম হয়ে গেছে !! 💔", 93000);
    await sendText(`যদি তাকে সম্মান করতে না পারো। 💔তবে তাকে কখনো ভালোবাসি কথাটি বলো না।🙂🥰। ${mentionName}`, 99000);
    await sendText(`সিঙ্গেল প্রেমকে গার্লফ্রেন্ড দিন😍.আপনি মেয়ে হলে আপনিই প্রেম করুন🥰🥰😇.. ${mentionName}`, 105000);
    await sendText(`সফল মানুষেরা কাজ করে যায়।তারা ভুল করে, ভুল শোধরায়, কিন্তু কখনও হাল ছাড়ে না।🐰 ${mentionName}`, 111000);
    await sendText("~ বড়দেরকে সম্মান করতে শিখুন😍", 114000);

  } catch (error) {
    console.error(error);
  }
}
