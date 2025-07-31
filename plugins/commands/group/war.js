export const config = {
  name: "war",
  version: "1.0.0",
  permissions: [2],
  credits: "SK-SIDDIK-KHAN",
  category: "admin",
  usages: "please @mention",
  cooldowns: 5,
};

export async function onCall({ message, api = global.api, userPermissions }) {
  try {
    if (!api) return console.error("API not found!");

    console.log("User Permissions:", userPermissions);

    if (!userPermissions || !userPermissions.includes(2)) {
      return api.sendMessage("❌ You do not have permission to use this command 🔐", message.threadID);
    }

    const mentions = message.mentions || {};
    const mentionIDs = Object.keys(mentions);
    if (mentionIDs.length === 0) {
      return api.sendMessage("যেই নাস্তিক কে শিক্ষা দিতে চান তাকে @ম্যানশন দেও", message.threadID);
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

   await sendText(`বজ্জাত নাস্তিক`, 0);
  await sendText(`তর মতো ফাজিল পলা পাইন এই প্রথম দেখলাম-!!😈। ${name}`, 3000);
  await sendText(`টোকাই পলা পাইন-!!😹.. ${name}`, 5000);
  await sendText(`নাস্তিকদের জায়গায় নাই তদের মতো নাস্তিক কে পেলে হাতে পায়ের রগ কেতে দিতাম-!!🩸🪓 ${name}`, 7000);
  await sendText(`দুরব চাওয়া মর তোর মতো ফাজিল আমাদের গ্রুপ এ থাকার যোগ্য-!!😹😈 ${name}`, 9000);
  await sendText(`কামলা পলা পাইন কামলা দিবি দে এতো নাটক কসর কেনো-!!😹 ${name}`, 12000);
  await sendText(`তুই তরা মা বাবার জারজ সন্তান-!!😈 ${name}`, 15000);
  await sendText(`বাপ চিনে লাগতে আসিস না হলে পরে আপসস করতে হবে-!!😈😹 ${name}`, 17000);
  await sendText(`ফাইলাম করি ভালো কথা তুই তর বাপের সাথে লাগতে আসবি কেনো রে নাস্তিক-!!🤬😈 ${name}`, 20000);
  await sendText(`তুই এতো টা খারাপ যে তোকে দেখে জাহান্নাম ও ভয়ে কান্না করছে-!!🙂 ${name}`, 23000);
  await sendText(`সময় থাকতে মানুষ হয়ে যা না হলে তরে আমাদের মানুষ করতে হবে-!!😈। ${name}`, 25000);
  await sendText(`ভিক্ষা করে তর জীবন চলে আর তুই আসছোট বাবাদের সাথে লাগতে-!!😈। ${name}`, 28500);
  await sendText(`দিন রাত হাত মাইরা বলস তুই পাপি নাহ তুই ভালো মানুষ-!!😹 ${name}`, 31000);
  await sendText(`টোকাই পলা পাইন আমাদের ডাস্টবিনের ময়লা আবর্জনা টুকিয়ে তর জীবন চলে আর তুই আমাদের উপরে আসস কথা বলতে-!!😹 ${name}`, 36000);
  await sendText(`থাপ্পর খাবি তো বাপ চিনবি-!!😹`, 39000);
  await sendText(`ভিক্ষা মাইংগা খাস আবার বড়ো বড়ো কথা বলস সরম করে নাহ নাস্তিক-!!😹। ${name}`, 42000);
  await sendText(`আমার ইসলাম এর সাথে লাগতে আসিস নাহ তোর জীবন এক থাপ্পড়ে শেষ করে দিবো ${name}`, 48000);
  await sendText(`তর মতো নাস্তিক আমাদের পা চেটে খায় আর তুই আমাদের সাথে লাগতে আসোস-!!😹😈 ${name}`, 51000);
  await sendText(`আমাদের নামে উল্টো পালটা কথা বইলা তর জীবন নিয়ে টানা টানি করিস নাহ-!!😹 ${name}`, 54000);
  await sendText(`আমাদের পা চেটে খাওয়া পোলা পাইন আমাদের সাথে লাগতে আসবি-!!😈🤬 ${name}`, 57000);
  await sendText(`বাস্ট্রাড এর বাচ্ছা বস্তির পোলা-!!🤧🤮 ${name}`, 87000);
  await sendText(`তর মা বাবার জারজ শন্তান-!!🤬😈`, 93000);
  await sendText(`তর মতো নাস্তিক পশুর থেকে নিক্রিসঠো-!!😈 ${name}`, 99000);
  await sendText(`তর জন্মদাতা রাস্তার কুত্তা-!!🤧😹 ${name}`, 105000);
  await sendText(`তুই কিত্তা তাই কুত্তার মতো শুধু গেও গেও করস-!!😹 ${name}`, 111000);
  await sendText(`তোর হয়তো জানা নেই ইসলাম কি জিনিস ইসলাম এর পাওয়ার কতো টুকু-!!😎⚡⛈️ ${name}`, 114000);
  await sendText(`সেই দিন কার কামলা পলা পাইন-!!😁 ${name}`, 120000);
  await sendText(`জুয়ারি গাঞ্জুটি পোলা পাইন ইসলামিক গ্রুপ এ থাকার জজ্ঞ নাহ-!!🤬 ${name}`, 126000);
  await sendText(`বস্তির ছেলে অনলাইনের কিং-!!😹 ${name}`, 132000);
  await sendText(`তুই টোকাই কিং-!!😹 ${name}`, 138000);
  await sendText(`টাকার অভাবে মরা গরু খাস-!!😹 ${name}`, 144000);
  await sendText(`টোকাই সেলিব্রেটি-!!😹 ${name}`, 150000);
  await sendText(`ভাত খাইবার ভাত পাস না আর কথা বলতে আসোস আমাদের সাথে-!!😹 ${name}`, 156000);
  await sendText(`ফকিন্নি পোলাপান-!!😹 ${name}`, 162000);
  await sendText(`বস্তিরন্দালাল এর বাচ্ছা বস্তির পোলা-!!😹 ${name}`, 168000);
  await sendText(`জারজ শন্তান জা ভাগ-!!😹😈`, 171000);
  await sendText(`hare is বস্তি পোলা-!!😹 ${name}`, 174000);
  await sendText(`বান্তেয়ামি করার জায়গা পাস না-!!🤬 ${name}`, 177000);
  await sendText(`লাগতে আসিস নাহ ভারচুয়াল জগত হারাম করে দিমু-!!🤬😈 ${name}`, 180000);
  } catch (error) {
    console.error(error);
    api.sendMessage("error", message.threadID);
  }
}
