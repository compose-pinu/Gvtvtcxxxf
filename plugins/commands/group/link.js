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

async function onCall(data = {}) {
  // Debug log to check if context is passed correctly
  console.log("🛠️ onCall context data:", data);

  const {
    api,
    args = [],
    event = {}
  } = data;

  // Fail early if API is not passed
  if (!api || typeof api.sendMessage !== "function") {
    console.error("❌ api.sendMessage is not available");
    return;
  }

  const {
    messageReply = null,
    senderID = null,
    threadID = null,
    messageID = null,
    type = null,
    mentions = {}
  } = event;

  let uid;

  if (type === "message_reply" && messageReply?.senderID) {
    uid = messageReply.senderID;
  } else if (args.join(" ").includes("@") && Object.keys(mentions).length > 0) {
    uid = Object.keys(mentions)[0];
  } else {
    uid = senderID;
  }

  if (!uid) {
    return api.sendMessage("⚠️ Could not determine user ID.", threadID, messageID);
  }

  try {
    const userInfo = await api.getUserInfo(uid);
    const { profileUrl } = userInfo[uid];

    if (!profileUrl) {
      throw new Error("No profileUrl returned.");
    }

    return api.sendMessage(`🔗 Facebook profile:\n${profileUrl}`, threadID, messageID);
  } catch (err) {
    console.error("❌ Failed to fetch profile link:", err);
    return api.sendMessage("⚠️ Could not retrieve user profile link.", threadID, messageID);
  }
}

export default {
  config,
  onCall
};
