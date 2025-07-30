const _4HOURS = 1000 * 60 * 60 * 4;
const MAX_EXP = Number.MAX_SAFE_INTEGER;

export default function () {
  const { DATABASE } = global.config;
  const logger = global.modules.get('logger');

  function getAvatarUrl(uid) {
    if (!uid) return null;
    return `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
  }

  async function getInfoAPI(uid) {
    if (!uid) return null;
    uid = String(uid);
    const info = await global.api.getUserInfo(uid) || [];
    if (info[uid]) {
      let _info = { ...info[uid] };
      delete _info.thumbSrc;
      updateInfo(uid, _info);
      return info;
    } else {
      create(uid, {});
      return null;
    }
  }

  async function get(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = global.data.users.get(uid) || null;

    if (userData === null || !userData?.info?.id) {
      if (userData === null || userData?.hasOwnProperty("lastUpdated")) {
        if (userData === null || userData.lastUpdated + _4HOURS < Date.now()) {
          await getInfoAPI(uid);
        }
      }
      return global.data.users.get(uid) || null;
    } else return userData;
  }

  function getAll(uids) {
    if (uids && Array.isArray(uids))
      return uids.map(uid => global.data.users.get(String(uid)) || null);
    else return Array.from(global.data.users.values());
  }

  async function getInfo(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = await get(uid);
    return userData?.info || null;
  }

  async function getName(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = await get(uid);
    return userData?.info?.name || null;
  }

  async function getData(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = await get(uid);
    return userData?.data || null;
  }

  function updateInfo(uid, data) {
    if (!uid || !data || typeof data !== "object" || Array.isArray(data)) return false;
    uid = String(uid);
    const userData = global.data.users.get(uid) || null;
    if (userData !== null) {
      Object.assign(userData.info, data);
      global.data.users.set(uid, userData);
      return true;
    } else return create(uid, data);
  }

  async function updateData(uid, data) {
    if (!uid || !data || typeof data !== "object" || Array.isArray(data)) return false;
    uid = String(uid);
    try {
      const userData = await get(uid);
      if (userData !== null) {
        if (data.hasOwnProperty("exp")) {
          if (Number(data.exp) > MAX_EXP) data.exp = MAX_EXP;
          else if (Number(data.exp) < 0) data.exp = 0;
          else data.exp = Number(data.exp);
        }
        if (data.hasOwnProperty("money")) {
          if (BigInt(data.money) < 0) data.money = "0";
          else data.money = String(BigInt(data.money));
        }
        Object.assign(userData.data, data);
        global.data.users.set(uid, userData);
        return true;
      } else return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function create(uid, data) {
    if (!uid || !data) return false;
    uid = String(uid);
    const userData = global.data.users.get(uid) || null;
    if (userData === null) {
      data.thumbSrc = getAvatarUrl(uid);
      global.data.users.set(uid, {
        userID: uid,
        info: data,
        data: { exp: 1, money: "0" }
      });

      if (DATABASE === 'MONGO') {
        global.data.models.Users.create({
          userID: uid,
          info: data,
          data: { exp: 1, money: "0" }
        }, (err, res) => {
          if (err) return false;
          logger.custom(global.getLang(`database.user.get.success`, { userID: uid }), 'DATABASE');
          return true;
        });
      }

      if (DATABASE === 'JSON') {
        logger.custom(global.getLang(`database.user.get.success`, { userID: uid }), 'DATABASE');
        return true;
      }

    } else {
      Object.assign(userData.info, data);
      global.data.users.set(uid, userData);
    }
  }

  function getMoney(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = global.data.users.get(uid) || null;
    if (userData !== null) return userData.data.money || "0";
    else return null;
  }

  function increaseMoney(uid, amount) {
    if (!uid || !amount) return false;
    uid = String(uid);
    if (isNaN(amount)) return false;
    try {
      const userData = global.data.users.get(uid) || null;
      if (userData !== null) {
        const currentMoney = BigInt(userData.data.money || "0");
        const finalNumber = currentMoney + BigInt(amount);
        userData.data.money = String(finalNumber);
        global.data.users.set(uid, userData);
        return true;
      } else return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function decreaseMoney(uid, amount) {
    if (!uid || !amount) return false;
    uid = String(uid);
    if (isNaN(amount)) return false;
    try {
      const userData = global.data.users.get(uid) || null;
      if (userData !== null) {
        const currentMoney = BigInt(userData.data.money || "0");
        const finalNumber = currentMoney - BigInt(amount);
        userData.data.money = finalNumber < 0 ? "0" : String(finalNumber);
        global.data.users.set(uid, userData);
        return true;
      } else return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function getExp(uid) {
    if (!uid) return null;
    uid = String(uid);
    const userData = global.data.users.get(uid) || null;
    if (userData !== null) return userData.data.exp || 0;
    else return null;
  }

  function increaseExp(uid, amount) {
    if (!uid || !amount) return false;
    uid = String(uid);
    if (isNaN(amount)) return false;
    try {
      const userData = global.data.users.get(uid) || null;
      if (userData !== null) {
        let finalNumber = Number(userData.data.exp || 0) + Number(amount);
        finalNumber = finalNumber < 0 ? 0 : finalNumber > MAX_EXP ? MAX_EXP : finalNumber;
        userData.data.exp = finalNumber;
        global.data.users.set(uid, userData);
        return true;
      } else return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function decreaseExp(uid, amount) {
    if (!uid || !amount) return false;
    uid = String(uid);
    if (isNaN(amount)) return false;
    try {
      const userData = global.data.users.get(uid) || null;
      if (userData !== null) {
        let finalNumber = Number(userData.data.exp || 0) - Number(amount);
        finalNumber = finalNumber < 0 ? 0 : finalNumber > MAX_EXP ? MAX_EXP : finalNumber;
        userData.data.exp = finalNumber;
        global.data.users.set(uid, userData);
        return true;
      } else return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  return {
    get,
    getAll,
    getInfo,
    getName,
    getData,
    updateInfo,
    updateData,
    create,
    getMoney,
    increaseMoney,
    decreaseMoney,
    getExp,
    increaseExp,
    decreaseExp,
    getAvatarUrl 
  };
}
