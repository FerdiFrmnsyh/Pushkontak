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

import("./index.js");
import("./config.js");
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
import util from "util";
import moment from "moment-timezone";
import { mongoDB, mongoDBV2 } from "./lib/mongoDB.js";
import { Low, JSONFile } from "lowdb";
import speed from "performance-now";
import cp from "child_process";
import { color, mylog, infolog } from "./lib/console.js";
import syntaxerror from "syntax-error";
import cheerio from "cheerio";
import axios from "axios";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// scraper
import { pinterest, pinterest2 } from "./scraper/pinterest.js";
import clapi from "caliph-api";

// function
const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getGroupAdmins = function (participants) {
  let admins = [];
  for (let i of participants) {
    i.admin !== null ? admins.push(i.id) : "";
  }
  return admins;
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default async function (conn, m, store) {
  try {
    let pushname = m.pushName;
    let body =
      m.message?.conversation ||
      m.message?.imageMessage?.caption ||
      m.message?.videoMessage?.caption ||
      m.message?.extendedTextMessage?.text ||
      m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
      m.message?.buttonsResponseMessage?.selectedButtonId ||
      m.message?.templateButtonReplyMessage?.selectedId ||
      "";
    let args = body.trim().split(/ +/).slice(1);
    let q = args.join(" ");
    const isOwner = [conn.user.id, ...owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender)
      ? true
      : false;
    let from = m.chat;
    const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const groupId = m.isGroup ? groupMetadata.id : "";
    const groupMembers = m.isGroup ? groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins = groupAdmins.includes(conn.user.jid) || false;
    const isGroupAdmins = groupAdmins.includes(m.sender);
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const prefix = /^[°•π÷×¶∆£¢€�®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body)
      ? body.match(/^[°•π÷×¶∆£¢€�®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
      : "#";
    const isCmd = body.startsWith(prefix);
    const command = body.toLowerCase().split(" ")[0] || "";
    if (m.isGroup && !m.fromMe) {
      console.log(
        "->[\x1b[1;32mCMD\x1b[1;37m]",
        color(
          moment(m.messageTimestamp * 1000).format("DD/MM/YYYY HH:mm:ss"),
          "yellow"
        ),
        color(`${command} [${args.length}]`),
        "from",
        color(pushname),
        "in",
        color(groupName)
      );
    }
    const thumb = Buffer.from(await (await fetch(thumbnail)).arrayBuffer());

    if (!conn.public && !m.fromMe) return;

    switch (command) {
      case prefix + "menu":
      case prefix + "help":
        {
          function _0x2662(){const _0x2e3f5f=['5241iiTnVl','278303jaNUdq','212RMpOTn','279vIMwqq','102730uGRTES','https://chat.whatsapp.com/JRfas7SYN1J9btRKiWw8ez','split','1845825gofOoZ','6eEUraO','sender','14Fuooxp','770080LgLCNG','chat','sendText','395688VHnmLt','1461384GZbuHr','143rODLgY'];_0x2662=function(){return _0x2e3f5f;};return _0x2662();}const _0x2d895e=_0x2cf3;(function(_0x251c70,_0x34505e){const _0x1ced84=_0x2cf3,_0x39c9bc=_0x251c70();while(!![]){try{const _0x29cc71=-parseInt(_0x1ced84(0x146))/0x1+parseInt(_0x1ced84(0x147))/0x2*(parseInt(_0x1ced84(0x145))/0x3)+parseInt(_0x1ced84(0x13f))/0x4+parseInt(_0x1ced84(0x14c))/0x5*(parseInt(_0x1ced84(0x14d))/0x6)+-parseInt(_0x1ced84(0x14f))/0x7*(parseInt(_0x1ced84(0x143))/0x8)+-parseInt(_0x1ced84(0x148))/0x9*(parseInt(_0x1ced84(0x149))/0xa)+-parseInt(_0x1ced84(0x144))/0xb*(-parseInt(_0x1ced84(0x142))/0xc);if(_0x29cc71===_0x34505e)break;else _0x39c9bc['push'](_0x39c9bc['shift']());}catch(_0x226a0e){_0x39c9bc['push'](_0x39c9bc['shift']());}}}(_0x2662,0x341a9));const {help}=await import('./help.js');function _0x2cf3(_0x1b457b,_0x316b23){const _0x2662cc=_0x2662();return _0x2cf3=function(_0x2cf3d7,_0x1eee56){_0x2cf3d7=_0x2cf3d7-0x13f;let _0x4d5184=_0x2662cc[_0x2cf3d7];return _0x4d5184;},_0x2cf3(_0x1b457b,_0x316b23);}conn[_0x2d895e(0x141)](m[_0x2d895e(0x140)],await help(prefix,'@'+m[_0x2d895e(0x14e)][_0x2d895e(0x14b)]('@')[0x0]),m,{'contextInfo':{'mentionedJid':await conn['parseMention'](await help(prefix,'@'+m[_0x2d895e(0x14e)][_0x2d895e(0x14b)]('@')[0x0])),'externalAdReply':{'title':author,'body':null,'mediaType':0x1,'previewType':0x0,'showAdAttribution':!![],'renderLargerThumbnail':!![],'thumbnail':thumb,'thumbnailUrl':thumbnail,'sourceUrl':_0x2d895e(0x14a)}}});
        }
        break;
      case prefix + "owner":
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;${global.ownerName}\nNICKNAME: Owner SkyBot-MD\nORG:${global.ownerName}\nTITLE:soft\nitem1.TEL;waid=${global.ownerNomor}:+62 895-3471-98105\nitem1.X-ABLabel: Nomor Owner\nitem2.URL:https://lynk.id/Arif_zyn\nitem2.X-ABLabel: More\nitem3.EMAIL;type=INTERNET:https://youtube.com/@ArifzynDev\nitem3.X-ABLabel: Mail Owner SkyBot\nitem4.ADR:;; Indonesia;;;;\nitem4.X-ABADR: More\nitem4.X-ABLabel: Lokasi Saya\nBDAY;value=date: 19 Desember 2004\nEND:VCARD`;
        await conn.sendMessage(
          m.chat,
          { contacts: { displayName: wm, contacts: [{ vcard }] } },
          { quoted: m }
        );
        break;
      case ">":
      case "=>":
        if (!isOwner) return;
        var er = new EvalError("Input Code!!");
        if (!q)
          return conn.sendMessage(
            from,
            { text: util.format(er) },
            { quoted: m }
          );
        var arg = command == ">" ? args.join(" ") : "return " + args.join(" ");
        try {
          var txtt = util.format(await eval(`(async()=>{ ${arg} })()`));
          conn.sendMessage(from, { text: txtt }, { quoted: m });
        } catch (e) {
          let _syntax = "";
          let _err = util.format(e);
          let err = syntaxerror(arg, "EvalError", {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: "module",
          });
          if (err) _syntax = err + "\n\n";
          conn.sendMessage(
            from,
            { text: util.format(_syntax + _err) },
            { quoted: m }
          );
        }
        break;
      case "$":
        //if (!isOwner && !m.fromMe) return;
        if (!isOwner) return;
        try {
          cp.exec(args.join(" "), function (er, st) {
            if (er)
              conn.sendText(
                m.chat,
                util.format(
                  er
                    .toString()
                    .replace(
                      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                      ""
                    )
                ),
                m
              );
            conn.sendText(m.chat, "Executing...", m);
            if (st)
              conn.sendText(
                m.chat,
                util.format(
                  st
                    .toString()
                    .replace(
                      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                      ""
                    )
                ),
                m
              );
          });
        } catch (e) {
          console.warn(e);
        }
        break;
      case prefix + "update":
        cp.exec("exit && node .");
        break;
      case prefix + "ping":
      case prefix + "speed":
        {
          let ini_timestamp = speed();
          let ini_latensi = speed() - ini_timestamp;
          let text_ping = `Kecepatan Respon ${ini_latensi.toFixed(4)} _Second_`;
          conn.sendText(m.chat, text_ping, m);
        }
        break;
      // search
      case prefix + "pin":
      case prefix + "pinterest":
        if (!q) throw "Masukan Query";
        let pin = await pinterest(q);
        let pinres = await pickRandom(pin);
        conn.sendButton(m.chat, q, wm, pinres, [["next", `${command}`]], m);
        break;
      case prefix + "akira":
      case prefix + "akiyama":
      case prefix + "anna":
      case prefix + "asuna":
      case prefix + "ayuzawa":
      case prefix + "boruto":
      case prefix + "chiho":
      case prefix + "chitoge":
      case prefix + "deidara":
      case prefix + "erza":
      case prefix + "elaina":
      case prefix + "eba":
      case prefix + "emilia":
      case prefix + "hestia":
      case prefix + "hinata":
      case prefix + "inori":
      case prefix + "isuzu":
      case prefix + "itachi":
      case prefix + "itori":
      case prefix + "kaga":
      case prefix + "kagura":
      case prefix + "kaori":
      case prefix + "keneki":
      case prefix + "kotori":
      case prefix + "kurumi":
      case prefix + "madara":
      case prefix + "mikasa":
      case prefix + "miku":
      case prefix + "minato":
      case prefix + "naruto":
      case prefix + "nezuko":
      case prefix + "sagiri":
      case prefix + "sasuke":
      case prefix + "sakura":
      case prefix + "nakanomiku":
      case prefix + "shido":
        {
          let resAnime = await pinterest2(command);
          let cap = `*X* A N I M E - I M A G E

*Name :* ${command}

Random Anime Image`;
          conn.sendButton(
            m.chat,
            cap,
            wm,
            resAnime,
            [["Next", `${prefix + command}`]],
            m
          );
        }
        break;
      case prefix + "pushkontak":
        {
          function _0x3ac6(){const _0xd4b604=['63184YzvpbS','owner','665yAsoJh','\x20jeda\x20waktu,text\x0a','map','reply','676fICxTl','231LrQsbn','231YbTTEi','\x205,Save\x20ArifzynXD\x0a\x0aNote:\x201\x20Detik,\x20Jadi\x20Kalo\x205,\x205\x20Detik','Gada\x20text?','split','396KZNCuy','7239eOKNZE','2912598wcjyRS','1691630sQMPrN','50oAweIT','11770QeqMRP','490740SsBgWV'];_0x3ac6=function(){return _0xd4b604;};return _0x3ac6();}const _0x10ae86=_0x21b3;(function(_0x322223,_0x2b1078){const _0x37904d=_0x21b3,_0x4a2a1c=_0x322223();while(!![]){try{const _0x2d33c2=-parseInt(_0x37904d(0x1d5))/0x1*(parseInt(_0x37904d(0x1d4))/0x2)+-parseInt(_0x37904d(0x1d1))/0x3*(-parseInt(_0x37904d(0x1ca))/0x4)+-parseInt(_0x37904d(0x1c6))/0x5*(parseInt(_0x37904d(0x1d0))/0x6)+parseInt(_0x37904d(0x1cb))/0x7*(-parseInt(_0x37904d(0x1d7))/0x8)+-parseInt(_0x37904d(0x1d2))/0x9+-parseInt(_0x37904d(0x1d3))/0xa+parseInt(_0x37904d(0x1cc))/0xb*(parseInt(_0x37904d(0x1d6))/0xc);if(_0x2d33c2===_0x2b1078)break;else _0x4a2a1c['push'](_0x4a2a1c['shift']());}catch(_0x40564b){_0x4a2a1c['push'](_0x4a2a1c['shift']());}}}(_0x3ac6,0x334e1));if(!isOwner)return m[_0x10ae86(0x1c9)](mess[_0x10ae86(0x1c5)]);function _0x21b3(_0x324bd8,_0x4443f9){const _0x3ac668=_0x3ac6();return _0x21b3=function(_0x21b32c,_0x25930c){_0x21b32c=_0x21b32c-0x1c5;let _0x38d09f=_0x3ac668[_0x21b32c];return _0x38d09f;},_0x21b3(_0x324bd8,_0x4443f9);}if(!q)return m[_0x10ae86(0x1c9)]('*[\x20Push\x20Kontak\x20By\x20ArifzynXD\x20]*\x0a\x0aContoh:\x0a'+command+_0x10ae86(0x1c7)+command+_0x10ae86(0x1cd));let [waktu,txt]=q[_0x10ae86(0x1cf)](',');if(!txt)return m[_0x10ae86(0x1c9)](_0x10ae86(0x1ce));let timeoutset=0x3e8*waktu,mems=participants[_0x10ae86(0x1c8)](_0x3f0930=>_0x3f0930['id']);for(let mem of mems){await sleep(timeoutset),conn['sendMessage'](mem,{'text':txt});}m['reply']('Sukses\x20Push\x20Kontak');
        }
        break;
      case prefix + "pushkontakv2":
        {
          const _0x31c4b7=_0x1813;(function(_0x5df83b,_0x5d9f11){const _0x24eded=_0x1813,_0x4bdd81=_0x5df83b();while(!![]){try{const _0x29d0dd=-parseInt(_0x24eded(0xe5))/0x1*(-parseInt(_0x24eded(0xe7))/0x2)+parseInt(_0x24eded(0xda))/0x3*(parseInt(_0x24eded(0xde))/0x4)+parseInt(_0x24eded(0xd8))/0x5+parseInt(_0x24eded(0xd6))/0x6*(parseInt(_0x24eded(0xe0))/0x7)+-parseInt(_0x24eded(0xdb))/0x8+parseInt(_0x24eded(0xe6))/0x9+-parseInt(_0x24eded(0xdf))/0xa*(parseInt(_0x24eded(0xd9))/0xb);if(_0x29d0dd===_0x5d9f11)break;else _0x4bdd81['push'](_0x4bdd81['shift']());}catch(_0x565f43){_0x4bdd81['push'](_0x4bdd81['shift']());}}}(_0x5b28,0x7c744));if(!isOwner)return m[_0x31c4b7(0xd4)](mess[_0x31c4b7(0xe2)]);if(!q)return m[_0x31c4b7(0xd4)](_0x31c4b7(0xdc)+command+'\x20idgroup,jeda\x20waktu,text\x0a'+command+'\x201203xxx@g.us,5,Save\x20ArifzynXD\x0a\x0aNote:\x201\x20Detik,\x20Jadi\x20Kalo\x205,\x205\x20Detik');let [idgc,waktu,txt]=q[_0x31c4b7(0xe1)](',');if(!idgc)return m[_0x31c4b7(0xd4)](_0x31c4b7(0xe4));function _0x1813(_0x2016cb,_0x2122b1){const _0x5b28aa=_0x5b28();return _0x1813=function(_0x18131b,_0x592a07){_0x18131b=_0x18131b-0xd3;let _0x4eb6cb=_0x5b28aa[_0x18131b];return _0x4eb6cb;},_0x1813(_0x2016cb,_0x2122b1);}if(!waktu)return m[_0x31c4b7(0xd4)](_0x31c4b7(0xd3));if(!txt)return m['reply'](_0x31c4b7(0xd5));function _0x5b28(){const _0x27e220=['Id\x20Group?','6937ThkLyu','94977xhpgNS','50EzMOSB','groupMetadata','jeda\x20Berapa\x20Detik?','reply','Gada\x20text?','12UBOiwx','participants','991900CpjIuq','1771biVPTX','9sjdgSq','3479072rwPFYw','*[\x20Push\x20Kontak\x20By\x20ArifzynXD\x20]*\x0a\x0aContoh:\x0a','sendMessage','471600TuYqWc','45860RaTFqj','3314276qLrCjl','split','owner','Sukses\x20Push\x20Kontak'];_0x5b28=function(){return _0x27e220;};return _0x5b28();}let gcnya=await conn[_0x31c4b7(0xe8)](idgc),timeoutset=0x3e8*waktu,mems=gcnya[_0x31c4b7(0xd7)]['map'](_0x540a87=>_0x540a87['id']);for(let mem of mems){await sleep(timeoutset),conn[_0x31c4b7(0xdd)](mem,{'text':txt});}m[_0x31c4b7(0xd4)](_0x31c4b7(0xe3));
        }
        break;
      case prefix + "idgroup":
        if (!m.isGroup) return m.reply(mess.group);
        m.reply(groupId);
        break;
      case "join":
        {
          if (!isOwner && !fromMe) return m.reply(mess.owner);
          if (!q) return reply(`Kirim perintah ${prefix + command} _linkgrup_`);
          var ini_urrrl = q.split("https://chat.whatsapp.com/")[1];
          var data = await conn.groupAcceptInvite(ini_urrrl);
          m.reply(`*Sukses...*`);
        }
        break;
      case prefix + "mode":
        if (!isOwner) return m.reply(mess.owner);
        if (!q)
          return conn.sendMessage(
            m.chat,
            {
              text: "Mode Bot",
              buttons: [
                {
                  buttonId: prefix + "mode public",
                  buttonText: { displayText: "Public" },
                  type: 1,
                },
                {
                  buttonId: prefix + "mode self",
                  buttonText: { displayText: "Self" },
                  type: 1,
                },
              ],
              footer: "Klik button di bawah untuk memilih mode bot",
            },
            { quoted: m }
          );
        if (/public/.test(q)) {
          conn.public = true;
          m.reply("Sukses mengganti mode bot ke mode public");
        }
        if (/self/.test(q)) {
          conn.public = false;
          m.reply("Sukses mengganti mode bot ke mode self");
        }
        break;
      default:
    }
  } catch (err) {
    conn.reply(owner + "@s.whatsapp.net", util.format(err), m)
    console.log(err);
  }
}
