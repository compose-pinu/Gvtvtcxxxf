const moment = require('moment-timezone');

const config = {
  name: "link",
  version: "1.0.0",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Get Facebook profile link",
  prefix: false,
  usePrefix: false, 
  usages: "link [@mention/reply]",
  cooldowns: 5
};

async function onCall({ message, args, api, event }) {
  const { messageReply, senderID, threadID, messageID, type, mentions } = event;
  let uid;

  if (type === "message_reply") {
    uid = messageReply.senderID;
  } else if (args.join(" ").includes("@") && Object.keys(mentions).length > 0) {
    uid = Object.keys(mentions)[0];
  } else {
    uid = senderID;
  }

  try {
    const userInfo = await api.getUserInfo(uid);
    const { profileUrl } = userInfo[uid];

    return api.sendMessage(`${profileUrl}`, threadID, messageID);
  } catch (err) {
    return api.sendMessage("⚠️ Could not retrieve user profile link.", threadID, messageID);
  }
}

export default {
  config,
  onCall
};
