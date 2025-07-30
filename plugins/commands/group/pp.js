const config = {
  name: "pp",
  aliases: ["profile", "p"],
  permissions: [0],
  usage: "[mention | reply | uid | facebook link]",
  cooldown: 0,
  description: "Fetch profile picture of a user",
  credits: "SK-SIDDIK-KHAN",
  usePrefix: false  // true করলে prefix লাগবে, false করলে natural message detect হবে
};

async function onCall({ message, args, event = {} }) {
  // Access usersData controller
  const usersData = global.controllers?.usersData?.();
  if (!usersData || typeof usersData.getAvatarUrl !== "function") {
    return message.reply("❌ Error: usersData system not found.");
  }

  let uid = event.senderID;

  try {
    if (event.messageReply?.senderID) {
      uid = event.messageReply.senderID;
    } else if (event.mentions && Object.keys(event.mentions).length > 0) {
      uid = Object.keys(event.mentions)[0];
    } else if (args.join(" ").includes("facebook.com")) {
      const match = args.join(" ").match(/(\d{5,})/);
      if (match) uid = match[0];
      else throw new Error("Invalid Facebook URL.");
    } else if (args[0]) {
      uid = args[0];
    }

    const avt = usersData.getAvatarUrl(uid);
    if (!avt) throw new Error("Could not get avatar URL.");

    const stream = await global.utils.getStreamFromURL(avt);

    return message.reply({
      body: `🖼️ Profile picture of UID: ${uid}`,
      attachment: stream
    });

  } catch (error) {
    return message.reply(`⚠️ Error: ${error.message}`);
  }
}

export default {
  config,
  onCall
};
