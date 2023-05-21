import("./config.js");
export const help = async (prefix, name) => {
  return `Hi ${name}
Bot ini ada bot untuk push kontak Tidak Ada Fitur Lainnya

◦ *Library* : Baileys v9.0.5@adiwajshing/baileys
◦ *Rest API* : https://api.arifzynstore.my.id
◦ *Owner* : ArifzynXD

Script Bot Push Kontak (By ArifzynXD).
${readMore}

*乂 OWNER - MENU*

┌  ◦ >
│  ◦ =>
│  ◦ $
│  ◦ ${prefix}owner
│  ◦ ${prefix}join (link) 
│  ◦ ${prefix}idgroup
│  ◦ ${prefix}pushkontak
└  ◦ ${prefix}pushkontakv2


*乂 OTHER - MENU*

┌  ◦ ${prefix}ping
│  ◦ ${prefix}speed 
└  ◦ ${prefix}pinterest

${wm}
`;
};

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
