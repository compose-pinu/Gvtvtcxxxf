import "../cleanup.js";
import {} from "dotenv/config";
import { writeFileSync } from "fs";
import { resolve as resolvePath } from "path";
import logger from "./var/modules/logger.js";
import login from "aryan-nix-fca";
import startServer from "./dashboard/server/app.js";
import handleListen from "./handlers/listen.js";
import environments from "./var/modules/environments.get.js";
import _init_var from "./var/_init.js";
import replitDB from "@replit/database";
import { execSync } from "child_process";
import {
  initDatabase,
  updateJSON,
  updateMONGO,
  getUsersController,
  getThreadsController
} from "./handlers/database.js";
import crypto from "crypto";

const { isGlitch, isReplit } = environments;

process.stdout.write(String.fromCharCode(27) + "]0;" + "Xavia" + String.fromCharCode(7));

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled Rejection at Promise", p);
});

process.on("uncaughtException", (err, origin) => {
  logger.error("Uncaught Exception: " + err + ": " + origin);
});

process.on("SIGINT", () => {
  logger.system(global.getLang("build.start.exit"));
  global.shutdown();
});

process.on("SIGTERM", () => {
  logger.system(global.getLang("build.start.exit"));
  global.shutdown();
});

process.on("SIGHUP", () => {
  logger.system(global.getLang("build.start.exit"));
  global.shutdown();
});

async function start() {
  try {
    await _init_var();
    logger.system(global.getLang("build.start.varLoaded"));

    await initDatabase();

    // এখানে controller গুলো গ্লোবালে সেট করো
    global.controllers = {
      Users: getUsersController(),
      Threads: getThreadsController()
    };

    // Debug log
    console.log("Users controller loaded:", global.controllers.Users);
    console.log("getAvatarUrl is function:", typeof global.controllers.Users.getAvatarUrl);

    global.updateJSON = updateJSON;
    global.updateMONGO = updateMONGO;

    const serverAdminPassword = getRandomPassword(8);
    startServer(serverAdminPassword);
    process.env.SERVER_ADMIN_PASSWORD = serverAdminPassword;

    await booting(logger);
  } catch (err) {
    logger.error(err);
    return global.shutdown();
  }
}

global.listenerID = null;

function booting(logger) {
  return new Promise((resolve, reject) => {
    logger.custom(global.getLang("build.booting.logging"), "LOGIN");

    loginState()
      .then(async (api) => {
        global.api = api;
        global.botID = api.getCurrentUserID();
        logger.custom(global.getLang("build.booting.logged", { botID: global.botID }), "LOGIN");

        refreshState();
        if (global.config.REFRESH) autoReloadApplication();

        const newListenerID = generateListenerID();
        global.listenerID = newListenerID;
        global.listenMqtt = api.listenMqtt(await handleListen(newListenerID));
        refreshMqtt();

        resolve();
      })
      .catch((err) => {
        if (
          isGlitch &&
          global.isExists(resolvePath(process.cwd(), ".data", "appstate.json"), "file")
        ) {
          global.deleteFile(resolvePath(process.cwd(), ".data", "appstate.json"));
          execSync("refresh");
        }
        reject(err);
      });
  });
}

const _12HOUR = 1000 * 60 * 60 * 12;
const _2HOUR = 1000 * 60 * 60 * 2;

function refreshState() {
  global.refreshState = setInterval(() => {
    logger.custom(global.getLang("build.refreshState"), "REFRESH");
    const newAppState = global.api.getAppState();
    if (global.config.APPSTATE_PROTECTION === true) {
      if (isGlitch) {
        writeFileSync(resolvePath(process.cwd(), ".data", "appstate.json"), JSON.stringify(newAppState, null, 2), "utf-8");
      } else if (isReplit) {
        let APPSTATE_SECRET_KEY;
        let db = new replitDB();
        db.get("APPSTATE_SECRET_KEY")
          .then((value) => {
            if (value !== null) {
              APPSTATE_SECRET_KEY = value;
              const encryptedAppState = global.modules.get("aes").encrypt(JSON.stringify(newAppState), APPSTATE_SECRET_KEY);
              writeFileSync(resolvePath(global.config.APPSTATE_PATH), JSON.stringify(encryptedAppState), "utf8");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      writeFileSync(resolvePath(global.config.APPSTATE_PATH), JSON.stringify(newAppState, null, 2), "utf8");
    }
  }, _12HOUR);
}

function refreshMqtt() {
  global.refreshMqtt = setInterval(async () => {
    logger.custom(global.getLang("build.refreshMqtt"), "REFRESH");
    const newListenerID = generateListenerID();
    global.listenMqtt.stopListening();
    global.listenerID = newListenerID;
    global.listenMqtt = global.api.listenMqtt(await handleListen(newListenerID));
  }, _2HOUR);
}

function generateListenerID() {
  return Date.now() + crypto.randomBytes(4).toString('hex');
}

function autoReloadApplication() {
  setTimeout(() => global.restart(), global.config.REFRESH);
}

function loginState() {
  const { APPSTATE_PATH, APPSTATE_PROTECTION } = global.config;

  return new Promise((resolve, reject) => {
    global.modules
      .get("checkAppstate")(APPSTATE_PATH, APPSTATE_PROTECTION)
      .then((appState) => {
        const options = global.config.FCA_OPTIONS;
        login({ appState }, options, (error, api) => {
          if (error) return reject(error.error || error);
          resolve(api);
        });
      })
      .catch((err) => reject(err));
  });
}

function getRandomPassword(length = 8) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

start();
