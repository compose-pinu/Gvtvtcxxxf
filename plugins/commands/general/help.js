const config = {
    name: "help",
    _name: {
        "ar_SY": "الاوامر"
    },
    aliases: ["cmds", "commands"],
    version: "1.0.3",
    description: "Show all commands or command details",
    usage: "[page|command] (optional)",
    credits: "XaviaTeam"
};

const langData = {
    "en_US": {
        "help.list": "{list}\n\n⇒ Total: {total} commands\n⇒ Use {syntax} [command] to get more information about a command.",
        "help.commandNotExists": "Command {command} does not exists.",
        "help.commandDetails": `
            ⇒ Name: {name}
            ⇒ Aliases: {aliases}
            ⇒ Version: {version}
            ⇒ Description: {description}
            ⇒ Usage: {usage}
            ⇒ Permissions: {permissions}
            ⇒ Category: {category}
            ⇒ Cooldown: {cooldown}
            ⇒ Credits: {credits}
        `,
        "0": "Member",
        "1": "Group Admin",
        "2": "Bot Admin"
    },
    "vi_VN": {
        "help.list": "{list}\n\n⇒ Tổng cộng: {total} lệnh\n⇒ Sử dụng {syntax} [lệnh] để xem thêm thông tin về lệnh.",
        "help.commandNotExists": "Lệnh {command} không tồn tại.",
        "help.commandDetails": `
            ⇒ Tên: {name}
            ⇒ Tên khác: {aliases}
            ⇒ Phiên bản: {version}
            ⇒ Mô tả: {description}
            ⇒ Cách sử dụng: {usage}
            ⇒ Quyền hạn: {permissions}
            ⇒ Thể loại: {category}
            ⇒ Thời gian chờ: {cooldown}
            ⇒ Người viết: {credits}
        `,
        "0": "Thành viên",
        "1": "Quản trị nhóm",
        "2": "Quản trị bot"
    },
    "ar_SY": {
        "help.list": "{list}\n\n⇒ المجموع: {total} الاوامر\n⇒ يستخدم {syntax} [امر] لمزيد من المعلومات حول الأمر.",
        "help.commandNotExists": "امر {command} غير موجود.",
        "help.commandDetails": `
            ⇒ اسم: {name}
            ⇒ اسم مستعار: {aliases}
            ⇒ وصف: {description}
            ⇒ استعمال: {usage}
            ⇒ الصلاحيات: {permissions}
            ⇒ فئة: {category}
            ⇒ وقت الانتظار: {cooldown}
            ⇒ الاعتمادات: {credits}
        `,
        "0": "عضو",
        "1": "إدارة المجموعة",
        "2": "ادارة البوت"
    }
};

function getCommandName(commandName) {
    if (global.plugins.commandsAliases.has(commandName)) return commandName;

    for (let [key, value] of global.plugins.commandsAliases) {
        if (value.includes(commandName)) return key;
    }

    return null;
}

async function onCall({ message, args, getLang, userPermissions, prefix }) {
    const { commandsConfig } = global.plugins;
    const language = message?.thread?.data?.language || global.config.LANGUAGE || 'en_US';

    const pageArg = args[0];
    const commandName = (pageArg && isNaN(pageArg)) ? pageArg.toLowerCase() : null;
    const page = (pageArg && !isNaN(pageArg)) ? Math.max(1, parseInt(pageArg)) : 1;

    if (!commandName) {
        // Prepare commands grouped by category for current user permission
        let commands = {};
        for (const [key, value] of commandsConfig.entries()) {
            if (value.isHidden) continue;
            if (value.isAbsolute && !global.config?.ABSOLUTES.includes(message.senderID)) continue;
            if (!value.permissions) value.permissions = [0, 1, 2];
            if (!value.permissions.some(p => userPermissions.includes(p))) continue;

            const category = value.category || "Misc";
            if (!commands[category]) commands[category] = [];
            commands[category].push(value._name?.[language] || key);
        }

        // Flatten all command names into an array for pagination
        const allCommands = Object.values(commands).flat();

        const perPage = 20;
        const totalPages = Math.ceil(allCommands.length / perPage);
        if (page > totalPages) {
            return message.reply(`Page ${page} doesn't exist. Maximum pages: ${totalPages}.`);
        }

        const start = (page - 1) * perPage;
        const pageCommands = allCommands.slice(start, start + perPage);

        // Create a styled message
        const msg = `┏━[𝗟𝗶𝘀𝘁 𝗼𝗳 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀]━➣\n` +
            pageCommands.map((cmd, i) => `┃━➤  ${start + i + 1} •──⋅☾ ${cmd}`).join("\n") + `\n` +
            `┃━━━━━━━━━━━━━━━➢\n` +
            `┃━➤ 𝐏𝐀𝐆𝐄 (${page}/${totalPages})\n` +
            `┃━➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${allCommands.length} \n` +
            `┗━━[𝗦𝗜𝗗𝗗𝗜𝗞 𝗕𝗢𝗧]━━━➣`;

        return message.reply(msg);
    } else {
        // Show detailed info about a specific command
        const cmdKey = getCommandName(commandName);
        const command = commandsConfig.get(cmdKey);
        if (!command) return message.reply(getLang("help.commandNotExists", { command: commandName }));

        if (command.isHidden) return message.reply(getLang("help.commandNotExists", { command: commandName }));
        if (command.isAbsolute && !global.config?.ABSOLUTES.includes(message.senderID)) return message.reply(getLang("help.commandNotExists", { command: commandName }));
        if (!command.permissions.some(p => userPermissions.includes(p))) return message.reply(getLang("help.commandNotExists", { command: commandName }));

        const detailMsg = getLang("help.commandDetails", {
            name: command.name,
            aliases: command.aliases.join(", "),
            version: command.version || "1.0.0",
            description: command.description || '',
            usage: `${prefix}${cmdKey} ${command.usage || ''}`,
            permissions: command.permissions.map(p => getLang(String(p))).join(", "),
            category: command.category || "Misc",
            cooldown: command.cooldown || 3,
            credits: command.credits || ""
        }).replace(/^ +/gm, '');

        return message.reply(detailMsg);
    }
}

export default {
    config,
    langData,
    onCall
};
