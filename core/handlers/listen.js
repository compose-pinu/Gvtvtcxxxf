import moment from 'moment-timezone';
import handleEvents from './events.js';
import { handleDatabase } from './database.js';
import logger from '../var/modules/logger.js';

export default async function handleListen(listenerID) {
  const { handleCommand, handleReaction, handleMessage, handleReply, handleUnsend, handleEvent } = await handleEvents();
  const eventlog_excluded = ["typ", "presence", "read_receipt"];
  const logger = global.modules.get('logger');

  function handleEventLog(event) {
    const { LOG_LEVEL, timezone } = global.config;

    if (LOG_LEVEL == 0) return;
    if (eventlog_excluded.includes(event.type)) return;
    const { type, threadID, body, senderID } = event;
    if (LOG_LEVEL == 1) {
      let time = moment().tz(timezone).format('YYYY-MM-DD_HH:mm:ss');

      if (type == 'message' || type == 'message_reply') {
        logger.custom(`${threadID} • ${senderID} • ${body ? body : 'Photo, video, sticker, etc.'}`, `${time}`);
      }
    } else if (LOG_LEVEL == 2) {
      console.log(event);
    }

    return;
  }

  return async (err, event) => {
    if (global.listenerID != listenerID) return;
    if (!event) {
      logger.error(global.getLang("handlers.listen.accountError"));
      process.exit(0);
    }
    if (global.maintain && !global.config.MODERATORS.some(e => e == event.senderID || e == event.userID)) return;
    handleEventLog(event);
    if (global.config.ALLOW_INBOX !== true && event.isGroup === false) return;

    if (!eventlog_excluded.includes(event.type)) {
      await handleDatabase({ ...event });
    }

    switch (event.type) {
      case "message":
      case "message_reply":
        // ** এখানে "/" মেসেজ চেক **
        if (event.body?.trim() === "/") {
          const commandName = "slash";
          const command = global.plugins.commands.get(commandName);
          const commandConfig = global.plugins.commandsConfig.get(commandName);

          if (command && commandConfig) {
            const userPermissions = getUserPermissions(event.senderID, {});
            if (!checkPermission(commandConfig.permissions || [0], userPermissions)) return;

            const extraEventProps = getExtraEventProperties(event, { type: "command", commandName });
            Object.assign(event, extraEventProps);

            try {
              await command.onCall({
                message: event,
                args: [],
                getLang: (key, obj) => global.getLang(key, obj, commandName, event?.threadID ? global.controllers.Threads.get(event.threadID) : global.config.LANGUAGE),
                data: {},
                userPermissions,
                prefix: "",
              });
            } catch (err) {
              console.error(err);
              global.api.sendMessage(
                global.getLang("handlers.default.error", { error: String(err.message || err) }),
                event.threadID,
                event.messageID
              );
            }

            return; // অন্য কমান্ড রান হবে না
          }
        }

        handleMessage({ ...event });
        handleReply({ ...event });
        handleCommand({ ...event });
        break;

      case "message_reaction":
        handleReaction({ ...event });
        break;
      case "message_unsend":
        handleUnsend({ ...event });
        break;
      case "event":
      case "change_thread_image":
        handleEvent({ ...event });
        break;
      case "typ":
        break;
      case "presence":
        break;
      case "read_receipt":
        break;
      default:
        break;
    }
  };
}
