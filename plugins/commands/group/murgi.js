export const config = {
  name: "idia",
  version: "1.0.0",
  permissions: [2],
  credits: "SK-SIDDIK-KHAN",
  description: "একজনকে @ম্যানশন করে তাকে উপদেশ পাঠান",
  category: "admin",
  usages: "please @mention",
  cooldowns: 5,
};

export async function onCall({ message, api = global.api, userPermissions }) {
  try {
    if (!api) return console.error("API not found!");

    if (!userPermissions || !userPermissions.includes(2)) {
      return api.sendMessage("❌ You do not have permission to use this command 🔐", message.threadID);
    }
    
    const mentions = message.mentions || {};
    const mentionIDs = Object.keys(mentions);
    if (mentionIDs.length === 0) {
      return api.sendMessage("আপনি কাকে চুদতে চান এমন 1 জনকে @ম্যানশন করতে হবে", message.threadID);
    }

    const mentionID = mentionIDs[0];
    const mentionName = mentions[mentionID];

    const arraytag = [{ id: mentionID, tag: mentionName }];

    function sendText(text, delay = 0) {
      return new Promise(resolve => setTimeout(() => {
        api.sendMessage({ body: text, mentions: arraytag }, message.threadID);
        resolve();
      }, delay));
      
    await sendText(`চুদা লো ${mentionName}`, 3000);

await sendText(`খাংকির পোলা তর মারে চুদি 🥰। ${mentionName}`, 3000);

await sendText(`খাংকির পোলা তর কচি বোন রে চুদি 😍.. ${mentionName}`, 5000);

await sendText(`মাদারচোদ তর আম্মু পম পম খাংকির পো 🐰 ${mentionName}`, 7000);

await sendText(`খাংকির পোলা তর কচি ভুদায় ভুদায় কামর দিমু 💔! ${mentionName}`, 9000);

await sendText(`খাংকি মাগির পোলা কথা ক কম কম তর আম্মু রে চুদে বানামু আইটেম বোম ${mentionName}`, 12000);

await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${mentionName}`, 15000);

await sendText(`তর আম্মু রে আচার এর লোভ দেখি চুদি মাগির পোলা🤬 ${mentionName}`, 17000);

await sendText(`বান্দির পোলা তর কচি বোনের ভুদা ফাক কর থুতু দিয়ে ভুদায় দন ডুকামু 🤟 ${mentionName}`, 20000);

await sendText(`বান্দি মাগির পোলা তর আম্মু রে চুদি তর দুলা ভাই এর কান্দে ফেলে 🤝 ${mentionName}`, 23000);

await sendText(`উফফফ খাদ্দামা মাগির পোলা তর আম্মুর কালা ভুদায় আমার মাল আউট তর কচি বোন রে উপ্তা করে এবার চুদবো 💉। ${mentionName}`, 25000);

await sendText(`অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি নয়ন তর বাপ মাগির ছেলে 😘। ${mentionName}`, 28500);

await sendText(`বাতিজা শুন তর আম্মু রে চুদলে রাগ করবি না তো আচ্ছা জা রাগ করিস না তর আম্মুর কালা ভুদায় আর চুদলাম না তো বোন এর জামা টা খুলে দে ✋ ${mentionName}`, 31000);

await sendText(`হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি ${mentionName}`, 36000);

await sendText(`চুদা কি আরো খাবি মাগির পোল 🤖${mentionName}`, 39000);

await sendText(`খাংকির পোলা 🥰। ${mentionName}`, 42000);

await sendText(`মাদারচোদ😍.. ${mentionName}`, 48000);

await sendText(`ব্যাস্যার পোলা 🐰 ${mentionName}`, 51000);

await sendText(`ব্যাশ্যা মাগির পোলা 💔! ${mentionName}`, 54000);

await sendText(`পতিতা মাগির পোলা ${mentionName}`, 57000);

await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${mentionName}`, 59400);

await sendText(`তর মারে চুদি ${mentionName}`, 63000);

await sendText(`নাট বল্টু মাগির পোলা🤟 ${mentionName}`, 66000);

await sendText(`তর বোন রে পায়জামা খুলে চুদি 🤣 ${mentionName}`, 69000);

await sendText(`উম্মম্মা তর বোন এরকচি ভুদায়💉। ${mentionName}`, 72000);

await sendText(`DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম। ${mentionName}`, 75000);

await sendText(`কামলা মাগির পোলা ✋ ${mentionName}`, 81000);

await sendText(`বাস্ট্রাড এর বাচ্ছা বস্তির পোলা ${mentionName}`, 87000);

await sendText(`Welcome মাগির পোলা 🥰। ${mentionName}`, 99000);

await sendText(`তর কচি বোন এর পম পম😍.. ${mentionName}`, 105000);

await sendText(`ব্যাস্যার পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰 ${mentionName}`, 111000);

await sendText(`Hi এসকে সিদ্দিক এর জারজ মাগির পোলা 💔! ${mentionName}`, 114000);

await sendText(`২০ টাকা এ পতিতা মাগির পোলা ${mentionName}`, 120000);

await sendText(`depression থেকেও তর মাইরে চু*** দি 🤬 ${mentionName}`, 126000);

await sendText(`বস্তির ছেলে অনলাইনের কিং ${mentionName}`, 132000);

await sendText(`টুকাই মাগির পোলা🤟 ${mentionName}`, 138000);

await sendText(`তর আম্মু রে পায়জামা খুলে চুদি 🤣 ${mentionName}`, 144000);

await sendText(`উম্মম্মা তর বোন এরকচি ভুদায়💉। ${mentionName}`, 150000);

await sendText(`DNA টেষ্ট করা দেখবি আমার চুদা তেই তর জন্ম। ${mentionName}`, 156000);

await sendText(`হিজলা মাগির পোলা ✋ ${mentionName}`, 162000);

await sendText(`বস্তিরন্দালাল এর বাচ্ছা বস্তির পোলা ${mentionName}`, 168000);

await sendText(`আমার জারজ শন্তান জা ভাগ🤖${mentionName}`, 171000);

await sendText(`Welcome শুয়োরের বাচ্চা 🥰। ${mentionName}`, 174000);
await sendText(`কুত্তার বাচ্ছা তর কচি বোন এর পম পম😍.. ${mentionName}`, 177000);
await sendText(`খাঙ্কিরপোলা পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰 ${mentionName}`, 180000);
await sendText(`Welcome শুয়োরের বাচ্চা 🥰${mentionName}`, 174000);
await sendText(`কুত্তার বাচ্ছা তর কচি বোন এর পম পম😍..${mentionName}`,177000);
await sendText(`খাঙ্কিরপোলা পোলা কথা শুন তর আম্মু রে চুদি গামছা পেচিয়ে🐰${mentionName}`,180000);
await sendText(`Hi নয়ন এর জারজ পোলা মাগির পোলা  💔!${mentionName}`,9000);
await sendText(`খান্কি মাগির পোলা ${mentionName}`,12000);
await sendText(`তোর বাপে তোর নানা। 🤬 ${mentionName}`,15000);
await sendText(`বস্তির ছেলে তোর বইনরে মুসলমানি দিমু${mentionName}`, 17000);
await sendText(`টুকাই মাগির পোলা মোবাইল ভাইব্রেশন কইরা তুর কচি বোন এর পুকটিতে ভরবো।🤟${mentionName}`,20000);
await sendText(`তোর মুখে হাইগ্যা দিমু। 🤣${mentionName}`,23000);
await sendText(`কুত্তার পুকটি চাটামু💉${mentionName}`, 25000);
await sendText(`তর আম্মুর হোগা দিয়া ট্রেন ভইরা দিমু।${mentionName}`, 28500);
await sendText(`হিজলা মাগির পোলা হাতির ল্যাওড়া দিয়া তর মায়েরে চুদুম।  ✋${mentionName}`,31000);
await sendText(`তর বোন ভোদা ছিল্লা লবণ লাগায় দিমু। ${mentionName}`,36000);
await sendText(`আমার ফাটা কন্ডমের ফসল। জা ভাগ ${mentionName}`, 39000);
await sendText(`Welcome শুয়োরের বাচ্চা 🥰${mentionName}`, 3000);
await sendText(`কুত্তার বাচ্ছা তর বৌন ভোদায় মাগুর মাছ চাষ করুম।😍..${mentionName}`,5000);
await sendText(`খাঙ্কিরপোলা পোলা তর বোনের  হোগায় ইনপুট, তর মায়ের ভোদায় আউটপুট।🐰${mentionName}`,7000);
await sendText(`তর মায়ের ভোদা বোম্বাই মরিচ দিয়া চুদামু।💔!${mentionName}`,9000);
await sendText(`খান্কি মাগির পোলা তর মায়ের ভোদা শিরিষ কাগজ দিয়া ঘইষা দিমু। ${mentionName}`,12000);
await sendText(`জং ধরা লোহা দিয়া পাকিস্তানের মানচিত্র বানাই্য়া তোদের পিছন দিয়া ঢুকামু।🤬 ${mentionName}`,15000);
await sendText(`বস্তির ছেলে তর মায়ের ভুদাতে পোকা${mentionName}`, 17000);
await sendText(`টুকাই মাগির পোলা তর মার ভোদায় পাব্লিক টয়লেট।🤟${mentionName}`,20000);
await sendText(`তোর মুখে হাইগ্যা দিমু। ভুস্কি মাগির পোলা 🤣${mentionName}`,23000);
await sendText(`কান্দে ফালাইয়া তর মায়েরে চুদি💉${mentionName}`, 25000);
await sendText(`তর আম্মুর উপ্তা কইরা চুদা দিমু।${mentionName}`, 28500);
await sendText(`হিজলা মাগির পোলা বালি দিয়া চুদমু তরে খাঙ্কি মাগী!তর মাকে।  ✋${mentionName}`,31000);
await sendText(`তর বোন ভোদা ছিল্লা লবণ লাগায় দিমু। ${mentionName}`,36000);
await sendText(`~ আমার পুত। জা ভাগ🤖", 39000);
};
