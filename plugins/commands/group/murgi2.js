export const config = {
  name: "murgi2",
  version: "1.0.0",
  permissions: [2],
  credits: "SK-SIDDIK-KHAN",
  category: "admin",
  usePrefix: false,
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
      return api.sendMessage("বস যে মেয়েকে চুদতে চাও সে মেয়েকে @ম্যানশন দেও", message.threadID);
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

    await sendText(`চুদা লো ${name}`, 0);
    await sendText(`খাংকির মেয়ে তর মারে চুদি 🥰। ${name}`, 3000);
    await sendText(`খাংকির মেয়ে তর কচি বোন রে চুদি 😍.. ${name}`, 5000);
    await sendText(`মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰 ${name}`, 7000);
    await sendText(`খাংকির মেয়ে তর কচি ভুদায় ভুদায় কামর দিমু 💔! ${name}`, 9000);
    await sendText(`খাংকি মাগির মেয়ে কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম ${name}`, 12000);
    await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${name}`, 15000);
    await sendText(`তর আম্মু রে আচার এর লোভ দেখি চুদি মাগির মেয়ে🤬 ${name}`, 17000);
    await sendText(`বান্দির মেয়ে তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟 ${name}`, 20000);
    await sendText(`বান্দি মাগির মেয়ে তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে 🤝 ${name}`, 23000);
    await sendText(`উফফফ খাদ্দামা মাগির মেয়ে তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো 💉। ${name}`, 25000);
    await sendText(`অনলাইনে গালি বাজ হয়ে গেছত মাগির মেয়ে এমন চুদা দিমু লাইফ টাইম মনে রাখভি নয়ন তর বাপ মাগির মেয়ে 😘। ${name}`, 28500);
    await sendText(`বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে ✋ ${name}`, 31000);
    await sendText(`হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি ${name}`, 36000);
    await sendText(`চুদা কি আরো খাবি মাগির পোল 🤖`, 39000);
    await sendText(`খাংকির মেয়ে 🥰। ${name}`, 42000);
    await sendText(`মাদারচোদ😍.. ${name}`, 48000);
    await sendText(`ব্যাস্যার মেয়ে 🐰 ${name}`, 51000);
    await sendText(`ব্যাশ্যা মাগির মেয়ে 💔! ${name}`, 54000);
    await sendText(`পতিতা মাগির মেয়ে ${name}`, 57000);
    await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${name}`, 59400);
    await sendText(`তর মারে চুদি ${name}`, 63000);
    await sendText(`নাট বল্টু মাগির মেয়ে🤟 ${name}`, 66000);
    await sendText(`তর বোন রে পায়জামা খুলে চুদি 🤣 ${name}`, 69000);
    await sendText(`উম্মম্মা তর বোন এরকচি ভুদায়💉। ${name}`, 72000);
    await sendText(`DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম। ${name}`, 75000);
    await sendText(`কামলা মাগির মেয়ে ✋ ${name}`, 81000);
    await sendText(`বাস্ট্রাড এর বাচ্ছা বস্তির মেয়ে ${name}`, 87000);
    await sendText(`আমার জারজ শন্তান🤖`, 93000);
    await sendText(`Welcome মাগির মেয়ে 🥰। ${name}`, 99000);
    await sendText(`তর কচি বোন এর পম পম😍.. ${name}`, 105000);
    await sendText(`ব্যাস্যার মেয়ে কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰 ${name}`, 111000);
    await sendText(`Hi এসকে সিদ্দিক এর জারজ মাগির মেয়ে 💔! ${name}`, 114000);
    await sendText(`২০ টাকা এ পতিতা মাগির মেয়ে ${name}`, 120000);
    await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${name}`, 126000);
    await sendText(`বস্তির মেয়ে অনলাইনের কিং ${name}`, 132000);
    await sendText(`টুকাই মাগির মেয়ে🤟 ${name}`, 138000);
    await sendText(`তর আম্মু রে পায়জামা খুলে চুদি 🤣 ${name}`, 144000);
    await sendText(`উম্মম্মা তর বোন এরকচি ভুদায়💉। ${name}`, 150000);
    await sendText(`DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম। ${name}`, 156000);
    await sendText(`হিজলা মাগির মেয়ে ✋ ${name}`, 162000);
    await sendText(`বস্তিরন্দালাল এর বাচ্ছা বস্তির মেয়ে ${name}`, 168000);
    await sendText(`আমার জারজ শন্তান জা ভাগ🤖`, 171000);
    await sendText(`Welcome শুয়োরের বাচ্চা 🥰। ${name}`, 174000);
    await sendText(`কুত্তার বাচ্ছা তর কচি বোন এর পম পম😍.. ${name}`, 177000);
    await sendText(`খাঙ্কিরমেয়ে মেয়ে কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰 ${name}`, 180000);
    await sendText(`Hi এসকে সিদ্দিক এর জারজ মেয়ে মাগির মেয়ে 💔! ${name}`, 9000);
  } catch (error) {
    console.error(error);
    api.sendMessage("error", message.threadID);
  }
}
