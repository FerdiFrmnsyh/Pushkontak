/*
 * Create By ArifzynXD
 * Base ArifzynXD
 * Script Ini Di Buat Oleh ArifzynXD Dari Awal
 * [ Thx To ]
 * DEFF
 * RonzzYT
 *
 * No enc ? buy, harga 25K Net wa.me/62895347198105
 */

"use strict";
import("./config.js");
import { createRequire } from "module";
import path, { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32"
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

const require = createRequire(import.meta.url);

const isNumber = (x) => typeof x === "number" && !isNaN(x);

const baileys = (await import("@adiwajshing/baileys")).default;
const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeWALegacySocket,
  proto,
  downloadContentFromMessage,
  jidDecode,
  makeInMemoryStore,
  areJidsSameUser,
  fetchLatestBaileysVersion,
  DisconnectReason,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  extractMessageContent,
  jidNormalizedUser,
  MessageType,
  Mimetype,
} = baileys;
import fs from "fs";
import clui from "clui";
import { color, mylog, infolog } from "./lib/console.js";
import { smsg, serialize } from "./lib/function.js";
// import { serialize } from "./lib/serialize.js";
import logg from "pino";
import axios from "axios";
import chalk from "chalk";
import util from "util";
import lodash from "lodash";
import syntaxerror from "syntax-error";
import yargs from "yargs";
import moment from "moment-timezone";
const time = moment(new Date()).format("HH:mm:ss DD/MM/YYYY");
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
import { Low, JSONFile } from "lowdb";
import speed from "performance-now";
import cp from "child_process";
import { fileTypeFromBuffer } from "file-type";

const importIndex = (await import("./msg.js")).default;

const { chain } = lodash;
// const { Low, JSONFile } = low
global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : /mongodb(\+srv)?:\/\//i.test(opts["db"])
    ? opts["mongodbv2"]
      ? new mongoDBV2(opts["db"])
      : new mongoDB(opts["db"])
    : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}src/database.json`)
);

global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(
            global.db.data == null ? global.loadDatabase() : global.db.data
          );
        }
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

if (!opts["test"]) {
  setInterval(async () => {
    if (global.db.data) await global.db.write().catch(console.error);
  }, 60 * 1000);
}

function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

function nocache(module, cb = () => {}) {
  console.log(`Module ${module} sedang diperhatikan terhadap perubahan`);
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

function nullish(args) {
  return !(args !== null && args !== undefined);
}

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

const { state, saveCreds } = await useMultiFileAuthState("sessions");

const store = makeInMemoryStore({
  logger: logg().child({ level: "fatal", stream: "store" }),
});

const connectToWhatsApp = async () => {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const conn = makeWASocket({
    logger: logg({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["Script By ArifzynXD", "Safari", "1.0.0"],
    auth: state,
    version,
  });
  console.log(chalk.cyan("Connect to WA Web"));
  conn.ev.on("creds.update", saveCreds);
  store.bind(conn.ev);

  await import("./index.js");
  await import("./msg.js");
  await nocache("./msg.js", (module) =>
    console.log(
      chalk.greenBright("[ WHATSAPP BOT ]  ") +
        time +
        chalk.cyanBright(` "${module}" Telah diupdate!`)
    )
  );
  await nocache("./index.js", (module) =>
    console.log(
      chalk.greenBright("[ WHATSAPP BOT ]  ") +
        time +
        chalk.cyanBright(` "${module}" Telah diupdate!`)
    )
  );

  console.log("Connecting...");
  console.log("\nCreator : ArifzynXD");
  console.log("Base Bot By ArifzynXD");

  conn.public = false;

  conn.ev.on("connection.update", (update) => {
    if (update.connection == "close") {
      var code = update.lastDisconnect?.error?.output?.statusCode;
      console.log(update.lastDisconnect?.error);
      if (code != 401) {
        connectToWhatsApp("sessions", owner);
      }
      if (update.connection == "open") {
      }
    }
    if (global.db.data == null) loadDatabase();
  });

  conn.sendText = (jid, text, quoted = "", options) =>
    conn.sendMessage(jid, { text: text, ...options }, { quoted });

  conn.parseMention = (text = "") => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (v) => v[1] + "@s.whatsapp.net"
    );
  };

  conn.reply = (jid, text = "", quoted, options) => {
    return Buffer.isBuffer(text)
      ? conn.sendFile(jid, text, "file", quoted, false, options)
      : conn.sendMessage(
          jid,
          { ...options, text },
          { quoted, mentions: conn.parseMention(text), ...options }
        );
  };

  conn.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  conn.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };

  conn.getFile = async (PATH, saveToFile = false) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH)
      ? PATH
      : PATH instanceof ArrayBuffer
      ? PATH.toBuffer()
      : /^data:.*?\/.*?;base64,/i.test(PATH)
      ? Buffer.from(PATH.split`,`[1], "base64")
      : /^https?:\/\//.test(PATH)
      ? await (res = await getBuffer(PATH))
      : fs.existsSync(PATH)
      ? ((filename = PATH), fs.readFileSync(PATH))
      : typeof PATH === "string"
      ? PATH
      : Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    const type = (await fileTypeFromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && saveToFile && !filename)
      (filename = path.join(
        __dirname,
        "./src/tmp/" + new Date() * 1 + "." + type.ext
      )),
        await fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      ...type,
      data,
      deleteFile() {
        return filename && fs.promises.unlink(filename);
      },
    };
  };

  conn.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
    let types = await conn.getFile(PATH, true);
    let { filename, size, ext, mime, data } = types;
    let type = "",
      mimetype = mime,
      pathFile = filename;
    if (options.asDocument) type = "document";
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require("./lib/sticker.js");
      let media = { mimetype: mime, data };
      pathFile = await writeExif(media, {
        packname: global.packname,
        author: global.packname,
        categories: options.categories ? options.categories : [],
      });
      await fs.promises.unlink(filename);
      type = "sticker";
      mimetype = "image/webp";
    } else if (/image/.test(mime)) type = "image";
    else if (/video/.test(mime)) type = "video";
    else if (/audio/.test(mime)) type = "audio";
    else type = "document";
    await conn.sendMessage(
      jid,
      {
        [type]: { url: pathFile },
        caption: cap,
        mimetype,
        fileName,
        ...options,
      },
      { quoted, ...options }
    );
    return fs.promises.unlink(pathFile);
  };

  conn.sendButton = async (
    jid,
    text = "",
    footer = "",
    buffer,
    buttons,
    quoted,
    options
  ) => {
    let type;
    if (Array.isArray(buffer))
      (options = quoted),
        (quoted = buttons),
        (buttons = buffer),
        (buffer = null);
    else if (buffer)
      try {
        (type = await conn.getFile(buffer)), (buffer = type.data);
      } catch {
        buffer = null;
      }
    if (!Array.isArray(buttons[0]) && typeof buttons[0] === "string")
      buttons = [buttons];
    if (!options) options = {};
    let message = {
      ...options,
      [buffer ? "caption" : "text"]: text || "",
      footer,
      buttons: buttons.map((btn) => ({
        buttonId:
          (!nullish(btn[1]) && btn[1]) || (!nullish(btn[0]) && btn[0]) || "",
        buttonText: {
          displayText:
            (!nullish(btn[0]) && btn[0]) || (!nullish(btn[1]) && btn[1]) || "",
        },
      })),
      ...(buffer
        ? options.asLocation && /image/.test(type.mime)
          ? {
              location: {
                ...options,
                jpegThumbnail: buffer,
              },
            }
          : {
              [/video/.test(type.mime)
                ? "video"
                : /image/.test(type.mime)
                ? "image"
                : "document"]: buffer,
            }
        : {}),
    };

    return await conn.sendMessage(jid, message, {
      quoted,
      upload: conn.waUploadToServer,
      ...options,
    });
  };

  conn.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  conn.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      if (!chatUpdate.messages[0]) return;
      let mek = chatUpdate.messages[0];
      let m = await smsg(conn, mek, store);
      await importIndex(conn, m, store);
    } catch (e) {
      console.log(e);
    }
  });
};
connectToWhatsApp("sessions", owner);
process.on("uncaughtException", console.error);
