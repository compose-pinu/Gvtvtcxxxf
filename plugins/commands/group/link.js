const config = {
  name: "link",
  version: "1.0.0",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Get Facebook profile link",
  usePrefix: false,
  category: "utility",
  usages: "link [@mention/reply]",
  cooldowns: 5
};

async function onCall({ message }) {
  const {
    messageReply,
    senderID,
    mentions,
    type,
    args,
    reply,
    send,
    api
  } = message;

  let uid;

  if (type === "message_reply" && messageReply?.senderID) {
    uid = messageReply.senderID;
  } else if (args.join(" ").includes("@") && Object.keys(mentions).length > 0) {
    uid = Object.keys(mentions)[0];
  } else {
    uid = senderID;
  }

  if (!uid) {
    return reply("⚠️ Could not determine user ID.");
  }

  try {
    const userInfo = await api.getUserInfo(uid);
    console.log("User info fetched:", userInfo);

    if (!userInfo || !userInfo[uid]) {
      return reply("⚠️ User info not found.");
    }

    const { profileUrl, name } = userInfo[uid];
    console.log("Profile URL:", profileUrl);

    if (!profileUrl) {
      return send(`User profile link not found. Here is the user ID: ${uid}`);
    }

    return send(`🔗 Profile of ${name}:\n${profileUrl}`);
  } catch (err) {
    console.error("❌ Failed to fetch profile link:", err);
    return reply("⚠️ Could not retrieve user profile link.");
  }
}

export default {
  config,
  onCall
};
