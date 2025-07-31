export const config = {
  name: "ping",
  version: "1.0.0",
  permission: 0,
  credits: "ChatGPT",
  description: "Check bot response time",
  usePrefix: true,
  cooldown: 5,
};

export async function run({ event, api }) {
  const start = Date.now();
  await api.sendMessage("🏓 Pong!", event.threadID, event.messageID);
  const end = Date.now();
  const latency = end - start;
  api.sendMessage(`Response time: ${latency} ms`, event.threadID, event.messageID);
}
