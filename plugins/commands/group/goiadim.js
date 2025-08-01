export const config = {
  name: "goiadmin",
  author: "SK-SIDDIK-KHAN",
  role: 0,
  usePrefix: false,
  shortDescription: "Sends funny message about admin",
  longDescription: "Send funny message about admin when command is called",
  category: "fun",
  guide: "{pn}"
};

const messages = [
  "Don't Mention My Owner, Busy Right Now 💞",
  "আমার বস চিপায় বিজি আছে___🌝",
  "মেয়ে পটাতে গেছে___😁",
  "এমন ভাবে মেনশান না দিয়ে একটা জি এফ দাও__🙈",
  "এত ডাকিস কেন__😡\nআমার বস অনেক বিজি__☺️",
  "বস কই তুমি\nতোমারে এক বলদে খুঁজ করে__🤣"
];

export async function onCall({ message }) {
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  return message.reply(randomMsg);
}
