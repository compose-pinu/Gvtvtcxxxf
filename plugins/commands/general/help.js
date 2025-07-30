import axios from "axios";
import { createWriteStream, existsSync, mkdirSync, createReadStream } from "fs";
import path from "path";

const config = {
  name: "help",
  aliases: ["cmds", "commands"],
  version: "1.0.0",
  description: "Show all available commands in a paginated list",
  usage: "[page]",
  credits: "XaviaTeam"
};

async function onCall({ message, args, userPermissions }) {
  const { commandsConfig } = global.plugins;

  const page = args[0] && !isNaN(args[0]) ? Math.max(1, parseInt(args[0])) : 1;

  // Group and filter commands
  let commands = [];
  for (const [key, value] of commandsConfig.entries()) {
    if (value.isHidden) continue;
    if (value.isAbsolute && !global.config?.ABSOLUTES?.includes(message.senderID)) continue;
    if (!value.permissions) value.permissions = [0, 1, 2];
    if (!value.permissions.some(p => userPermissions.includes(p))) continue;
    commands.push(value.name);
  }

  const perPage = 20;
  const totalPages = Math.ceil(commands.length / perPage);
  if (page > totalPages) return message.reply(`❌ Page ${page} doesn't exist. Max: ${totalPages}.`);

  const start = (page - 1) * perPage;
  const pageCommands = commands.slice(start, start + perPage);

  const msg = `┏━[𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁]━➣\n` +
    pageCommands.map((cmd, i) => `┃ ${start + i + 1}. ${cmd}`).join("\n") + `\n` +
    `┃━━━━━━━━━━━━━━━➢\n` +
    `┃ Page: ${page}/${totalPages}\n` +
    `┃ Total Commands: ${commands.length}\n` +
    `┗━━[𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧]━━━➣`;

  // Ensure temp folder exists
  const tempDir = path.join(process.cwd(), "temp");
  if (!existsSync(tempDir)) mkdirSync(tempDir);

  const imgPath = path.join(tempDir, "help.jpg");
  const imgUrl = "https://i.imgur.com/5KuCPVq.jpeg";

  // Download image if it doesn't exist
  if (!existsSync(imgPath)) {
    const response = await axios({
      url: imgUrl,
      method: "GET",
      responseType: "stream"
    });

    const writer = createWriteStream(imgPath);
    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }

  // Send message with image
  return message.reply({
    body: msg,
    attachment: createReadStream(imgPath)
  });
}

export default {
  config,
  onCall
};
