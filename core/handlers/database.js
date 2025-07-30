import { resolve } from "path";
import { writeFileSync, readFileSync, unlinkSync, existsSync, mkdirSync } from "fs";
import mongoose from "mongoose";
import Threads from "../var/controllers/thread.js";
import Users from "../var/controllers/user.js";
import models from "../var/models/index.js";

let _Threads;
let _Users;

function saveFile(path, data) {
  writeFileSync(path, data, "utf8");
}

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

async function initDatabase() {
  _Threads = Threads();
  _Users = Users();

  const logger = global.modules.get("logger");
  const { DATABASE } = global.config;
  const dataPath = resolve(process.cwd(), "core", "var", "data");
  const cachePath = global.cachePath || resolve(process.cwd(), "cache");

  ensureDir(dataPath);
  ensureDir(cachePath);

  global.data = global.data || {};
  global.data.threads = global.data.threads || new Map();
  global.data.users = global.data.users || new Map();
  global.data.models = models;

  if (DATABASE === "JSON") {
    const threadPath = resolve(dataPath, "threads.json");
    const userPath = resolve(dataPath, "users.json");

    if (!existsSync(threadPath)) saveFile(threadPath, "[]");
    if (!existsSync(userPath)) saveFile(userPath, "[]");

    let threadRaw = readFileSync(threadPath, "utf8");
    let userRaw = readFileSync(userPath, "utf8");

    if (!isJSON(threadRaw)) {
      logger.warn("threads.json corrupted, resetting...");
      saveFile(threadPath, "[]");
      threadRaw = "[]";
    }
    if (!isJSON(userRaw)) {
      logger.warn("users.json corrupted, resetting...");
      saveFile(userPath, "[]");
      userRaw = "[]";
    }

    let threadsArray = JSON.parse(threadRaw);
    let usersArray = JSON.parse(userRaw);

    if (!Array.isArray(threadsArray)) threadsArray = Object.values(threadsArray);
    if (!Array.isArray(usersArray)) usersArray = Object.values(usersArray);

    for (const tData of threadsArray) {
      if (tData.info?.adminIDs) {
        tData.info.adminIDs = tData.info.adminIDs.map((e) => e?.id || e);
      }
      global.data.threads.set(tData.threadID, tData);
    }
    for (const uData of usersArray) {
      global.data.users.set(uData.userID, uData);
    }

    logger.custom(`Loaded ${global.data.threads.size} threads from JSON`, "DATABASE");
    logger.custom(`Loaded ${global.data.users.size} users from JSON`, "DATABASE");

  } else if (DATABASE === "MONGO") {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) throw new Error("MONGO_URL not found in environment variables.");

    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO_URL);

    global.mongo = mongoose.connection;

    // Load from MongoDB collection
    const threads = await models.Threads.find({});
    const users = await models.Users.find({});

    for (const thread of threads) {
      if (thread.info?.adminIDs) {
        thread.info.adminIDs = thread.info.adminIDs.map((e) => e?.id || e);
      }
      global.data.threads.set(thread.threadID, thread);
    }
    for (const user of users) {
      global.data.users.set(user.userID, user);
    }

    logger.custom(`Loaded ${global.data.threads.size} threads from MongoDB`, "DATABASE");
    logger.custom(`Loaded ${global.data.users.size} users from MongoDB`, "DATABASE");
  }
}

function updateJSON() {
  const { threads, users } = global.data;
  const { DATABASE_JSON_BEAUTIFY } = global.config;

  const formatData = (data) =>
    DATABASE_JSON_BEAUTIFY
      ? JSON.stringify(data, null, 4)
      : JSON.stringify(data);

  const threads_array = Array.from(threads.values());
  const users_array = Array.from(users.values());

  const dataPath = resolve(process.cwd(), "core", "var", "data");

  // Backup and save threads
  saveFile(resolve(dataPath, "threads.bak.json"), JSON.stringify(threads_array));
  saveFile(resolve(dataPath, "threads.json"), formatData(threads_array));
  unlinkSync(resolve(dataPath, "threads.bak.json"));

  // Backup and save users
  saveFile(resolve(dataPath, "users.bak.json"), JSON.stringify(users_array));
  saveFile(resolve(dataPath, "users.json"), formatData(users_array));
  unlinkSync(resolve(dataPath, "users.bak.json"));
}

async function updateMONGO() {
  const { threads, users, models } = global.data;

  try {
    for (const [threadID, threadData] of threads.entries()) {
      await models.Threads.findOneAndUpdate({ threadID }, threadData, { upsert: true });
    }
    for (const [userID, userData] of users.entries()) {
      await models.Users.findOneAndUpdate({ userID }, userData, { upsert: true });
    }
  } catch (err) {
    throw err;
  }
}

async function handleDatabase(event) {
  const logger = global.modules.get("logger");
  const { senderID, userID, threadID, isGroup } = event;
  const targetID = userID || senderID;

  try {
    if (isGroup === true && !global.data.threads.has(threadID)) {
      await _Threads.get(threadID);
    }
    if (!global.data.users.has(targetID)) {
      await _Users.get(targetID);
    }
  } catch (e) {
    logger.custom(global.getLang("database.error", { error: String(e.message || e) }), "DATABASE");
    console.error(e);
  }
}

function getUsersController() {
  return _Users;
}

function getThreadsController() {
  return _Threads;
}

export {
  initDatabase,
  updateJSON,
  updateMONGO,
  handleDatabase,
  getUsersController,
  getThreadsController,
};
