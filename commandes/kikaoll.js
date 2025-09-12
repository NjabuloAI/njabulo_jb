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

const sleep = (ms) => {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
};

fana({ nomCom: "kickall", categorie: 'Group', reaction: "📣" }, async (chatId, zk, commandeOptions) => {

  const { auteurMessage, ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

  const metadata = await zk.groupMetadata(chatId);

  if (!verifGroupe) { 
    sendFormattedMessage(zk, chatId, "✋🏿 ✋🏿this command is reserved for groups ❌", ms);
    return; 
  }

  if (superUser || auteurMessage == metadata.owner) { 
    sendFormattedMessage(zk, chatId, 'Non-admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.', ms);
    await sleep(5000)
    let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
    try {
      let users = membresGroupe.filter((member) => !member.admin)

      for (const membre of users) {
        await zk.groupParticipantsUpdate(
          chatId, 
          [membre.id],
          "remove" 
        ) 
        await sleep(500)
      }  
    } catch (e) { 
      sendFormattedMessage(zk, chatId, "I need administration rights", ms);
    } 
  } else {
    sendFormattedMessage(zk, chatId, "Order reserved for the group owner for security reasons", ms);
  }
});