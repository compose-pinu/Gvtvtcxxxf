import axios from "axios";
import fs from "fs-extra";
import path from "path";
import jimp from "jimp";
import { downloadFile } from "#utils";

const __root = path.resolve();

export const config = {
  name: "hug1",
  version: "3.1.1",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Hug 🥰",
  prefix: true,
  category: "love",
  usages: "[@mention]",
  cooldowns: 5
};

export async function onLoad() {
  const dirMaterial = path.join(__dirname, "cache/canvas");
  const filePath = path.join(dirMaterial, "hugv2.png");
  const url = "https://drive.google.com/uc?id=1BzDpxRvIDGsUZXleL2tiZocSA5E4RWEW";

  if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(filePath)) await downloadFile(url, filePath);
}

async function circle(image) {
  const img = await jimp.read(image);
  img.circle();
  return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
  const canvasPath = path.join(__dirname, "cache", "canvas");
  const bgPath = path.join(canvasPath, "hugv2.png");
  const pathImg = path.join(canvasPath, `hug_${one}_${two}.png`);
  const avatarOne = path.join(canvasPath, `avt_${one}.png`);
  const avatarTwo = path.join(canvasPath, `avt_${two}.png`);

  const getAvatarOne = (await axios.get(
    `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  )).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, "utf-8"));

  const getAvatarTwo = (await axios.get(
    `https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  )).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, "utf-8"));

  const baseImg = await jimp.read(bgPath);
  const circ1 = await jimp.read(await circle(avatarOne));
  const circ2 = await jimp.read(await circle(avatarTwo));

  baseImg
    .composite(circ1.resize(100, 100), 370, 40)
    .composite(circ2.resize(100, 100), 330, 150);

  const buffer = await baseImg.getBufferAsync("image/png");
  fs.writeFileSync(pathImg, buffer);

  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}

export async function onCall({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mentionIDs = Object.keys(mentions || {});
  if (mentionIDs.length === 0) {
    return api.sendMessage("Please mention 1 person.", threadID, messageID);
  }

  const one = senderID;
  const two = mentionIDs[0];

  try {
    const imgPath = await makeImage({ one, two });
    return api.sendMessage(
      { body: "", attachment: fs.createReadStream(imgPath) },
      threadID,
      () => fs.unlinkSync(imgPath),
      messageID
    );
  } catch (err) {
    console.error("❌ Hug image generation failed:", err);
    return api.sendMessage("Failed to create hug image.", threadID, messageID);
  }
}

export default {
  config,
  onLoad,
  onCall
};
