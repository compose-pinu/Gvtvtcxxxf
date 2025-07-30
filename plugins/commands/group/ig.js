const config = {
  name: "ig",
  version: "1.0.0",
  description: "Triggers only when user sends '/'",
  usage: "/",
  credits: "XaviaTeam",
  usePrefix: false,
  noPrefix: ["/"]
};

async function onCall({ message }) {
  await message.reply("You just typed a single `/` 👀");
}

export { config, onCall };
