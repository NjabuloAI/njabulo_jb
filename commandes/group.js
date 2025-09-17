const { fana } = require("../njabulo/fana")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

    // List of image URLs
    const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "⏰ message group open & close",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: true,
        },
        },
          }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
}

fana({ nomCom: "group", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg, ms } = commandeOptions;

  if (!verifGroupe) return await sendFormattedMessage(zk, dest, "σrdєr rєsєrvєd fσr grσup σnlч", ms);

  if (!(superUser || verifAdmin)) return await sendFormattedMessage(zk, dest, "σrdєr rєsєrvєd fσr thє αdmínístrαtσrr", ms);

  if (!arg[0]) return await sendFormattedMessage(zk, dest, 'Instructions:\n\nType group open or close', ms);

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "open":
      await zk.groupSettingUpdate(dest, 'not_announcement');
      await sendFormattedMessage(zk, dest, 'group open', ms);
      break;
    case "close":
      await zk.groupSettingUpdate(dest, 'announcement');
      await sendFormattedMessage(zk, dest, 'grσup lσck succєssfullч 🔒', ms);
      break;
    default:
      await sendFormattedMessage(zk, dest, "plєαsє dσn't ínvєnt αn σptíσn", ms);
  }
});
