const { fana } = require('../njabulo/fana');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
      externalAdReply: {
        title: "Njabulo Jb",
        body: "Message via ad !",
        thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        mediaType: 1,
        showAdAttribution: true
      }
    }
  }, { quoted: ms });
}

fana({ nomCom: "block", categorie: "Mods" }, async (chatId, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    sendFormattedMessage(zk, chatId, "Command reserved for the bot owner", ms);
    return;
  }

  if (!msgRepondu) {
    if (verifGroupe) {
      sendFormattedMessage(zk, chatId, "Be sure to mention the person to block", ms);
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
    sendFormattedMessage(zk, chatId, "Command reserved for the bot owner", ms);
    return;
  }

  if (!msgRepondu) {
    if (verifGroupe) {
      sendFormattedMessage(zk, chatId, "Please mention the person to be unlocked", ms);
      return;
    }
    jid = chatId
    await zk.updateBlockStatus(jid, "unblock")
      .then(() => sendFormattedMessage(zk, chatId, "Success", ms));
  } else {
    jid = auteurMsgRepondu
    await zk.updateBlockStatus(jid, "unblock")
      .then(() => sendFormattedMessage(zk, chatId, "Success", ms));
  }
});