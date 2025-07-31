import axios from "axios";

const config = {
  name: "fbcover",
  description: "Generate a Facebook cover image with custom details",
  usage: "name | subname | phone | address | email | color",
  cooldown: 5,
  permissions: [0],
  usePrefix: true,
  credits: "SK-SIDDIK-KHAN"
};

async function onCall({ message, args }) {
  const apiUrl = "https://fbcover-apis.onrender.com/fbcover";

  const input = args.join(" ");
  const [name, subname, phone, address, email, color] = input.split("|").map(item => item?.trim());
  const id = message.senderID;

  if (!name || !subname || !email) {
    return message.reply(`❌ Missing required fields.\n👉 Usage: ${config.usage}`);
  }

  const url = `${apiUrl}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&address=${encodeURIComponent(address || "N/A")}&email=${encodeURIComponent(email)}&sdt=${encodeURIComponent(phone || "N/A")}&color=${encodeURIComponent(color || "red")}&uid=${id}`;

  try {
    const response = await axios.get(url, { responseType: "stream" });
    await message.reply({
      body: "✅ Here's your Facebook cover:",
      attachment: response.data
    });
  } catch (err) {
    console.error(err);
    return message.reply("❌ Failed to generate Facebook cover. Please try again later.");
  }
}

export default {
  config,
  onCall
};
