const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "Tokodori", // Convert By Goatbot Tokodori
    role: 0,
    shortDescription: "Show owner info and video",
    longDescription: "",
    category: "admin",
    guide: "{pn}"
  },

  async onCall({ api, event }) {
    try {
      const ownerInfo = {
        name: 'SAIFUL ISLAM',
        gender: 'Male',
        age: '20+',
        height: '6.1',
        choice: '',
        nick: 'SIFU'
      };

      const videoUrl = 'https://files.catbox.moe/a86iqb.mp4'; // Replace with your direct video URL

      const tmpFolderPath = path.join(__dirname, 'tmp');

      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = ` 
╭[ . ]•〆 SAIF 〆 ] ─⦿
╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
├‣ 𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}
├‣ 𝐀𝐠𝐞: ${ownerInfo.age}
├‣ 𝐍𝐢𝐜𝐤: ${ownerInfo.nick}
├‣ 𝐂𝐡𝐨𝐢𝐜𝐞: ${ownerInfo.choice}
├‣ 𝐇𝐞𝐢𝐠𝐡𝐭: ${ownerInfo.height}
╰────────────◊ 
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      if (event.body && event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🖤', event.messageID, () => {}, true);
      }
    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
