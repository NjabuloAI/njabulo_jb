const { fana } = require('../njabulo/fana');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");

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
     externalAdReply: {
         title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
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

fana({ nomCom: "block", categorie: "Mods" }, async (chatId, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    sendFormattedMessage(zk, chatId, "*Commᥲnd rᥱsᥱrvᥱd for thᥱ bot oᥕnᥱr*", ms);
    return;
  }

  if (!msgRepondu) {
    if (verifGroupe) {
      sendFormattedMessage(zk, chatId, "*Bᥱ sᥙrᥱ to mᥱntιon thᥱ ρᥱrson to bᥣoᥴk*", ms);
      return;
    }
    jid = chatId
    await zk.updateBlockStatus(jid, "block")
      .then(() => sendFormattedMessage(zk, chatId, "Success", ms));
  } else {
    jid = auteurMsgRepondu
    await zk.updateBlockStatus(jid, "block")
      .then(() => sendFormattedMessage(zk, chatId, "Success", ms));
  }
});

fana({ nomCom: "unblock", categorie: "Mods" }, async (chatId, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    sendFormattedMessage(zk, chatId, "*Commᥲnd rᥱsᥱrvᥱd for thᥱ bot oᥕnᥱr*", ms);
    return;
  }

  if (!msgRepondu) {
    if (verifGroupe) {
      sendFormattedMessage(zk, chatId, "*Pᥣᥱᥲsᥱ mᥱntιon thᥱ ρᥱrson to bᥱ ᥙnᥣoᥴkᥱd*", ms);
      return;
    }
    jid = chatId
    await zk.updateBlockStatus(jid, "unblock")
      .then(() => sendFormattedMessage(zk, chatId, "*Sᥙᥴᥴᥱss*", ms));
  } else {
    jid = auteurMsgRepondu
    await zk.updateBlockStatus(jid, "unblock")
      .then(() => sendFormattedMessage(zk, chatId, "*Sᥙᥴᥴᥱss*", ms));
  }
});
