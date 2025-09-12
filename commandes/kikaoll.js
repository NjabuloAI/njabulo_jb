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
         renderLargerThumbnail: false,
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

const sleep = (ms) => {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
};

fana({ nomCom: "kickall", categorie: 'Group', reaction: "📣" }, async (chatId, zk, commandeOptions) => {

  const { auteurMessage, ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

  const metadata = await zk.groupMetadata(chatId);

  if (!verifGroupe) { 
    sendFormattedMessage(zk, chatId, "*✋🏿 ✋🏿thιs ᥴommᥲnd ιs rᥱsᥱrvᥱd for groᥙρs*", ms);
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