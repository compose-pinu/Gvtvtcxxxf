const config = {
  name: "pp",
  aliases: ["profile", "p"],
  permissions: [0],
  usePrefix: false,
  usage: "[mention | reply | uid | facebook link]",
  cooldown: 0,
  description: "profile picture of a user",
  credits: "SK-SIDDIK-KHAN",
};

async function onCall({ message, args, event, usersData }) {
  const getAvatarUrl = async (uid) => await usersData.getAvatarUrl(uid);
  let uid = event?.senderID;
  let avt;

  try {
    if (event.type === "message_reply") {
      uid = event.messageReply.senderID;
    } else if (Object.keys(event.mentions || {}).length > 0) {
      uid = Object.keys(event.mentions)[0];
    } else if (args.join(" ").includes("facebook.com")) {
      const match = args.join(" ").match(/(\d+)/);
      if (match) uid = match[0];
      else throw new Error("Invalid Facebook URL.");
    } else if (args[0]) {
      uid = args[0];
    }

    avt = await getAvatarUrl(uid);
    const stream = await global.utils.getStreamFromURL(avt);

    return message.reply({ body: "", attachment: stream });
  } catch (error) {
    return message.reply(`⚠️ Error: ${error.message}`);
  }
}

export default {
  config,
  onCall
};
