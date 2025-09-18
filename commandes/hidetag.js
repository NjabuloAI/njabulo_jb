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
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "🤥message group hidetag",
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

fana({nomCom:"hidetag",categorie:'Group',reaction:"🎤"},async(dest,zk,commandeOptions)=>{

  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser, ms}=commandeOptions;

  if(!verifGroupe) return await sendFormattedMessage(zk, dest, 'This command is only allowed in groups.', ms);
  if (!(verifAdmin || superUser)) return await sendFormattedMessage(zk, dest, 'Command reserved for administrators.', ms);

  let metadata = await zk.groupMetadata(dest) ;
  let tag = metadata.participants.map((i) => i.id);

  if(msgRepondu) {
    let msg;

    if (msgRepondu.imageMessage) {
      let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      msg = {
        image : { url : media },
        caption : msgRepondu.imageMessage.caption,
        mentions : tag
      }
    } else if (msgRepondu.videoMessage) {
      let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      msg = {
        video : { url : media },
        caption : msgRepondu.videoMessage.caption,
        mentions : tag
      }
    } else if (msgRepondu.audioMessage) {
      let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
      msg = {
        audio : { url : media },
        mimetype:'audio/mp4',
        mentions : tag
      }
    } else if (msgRepondu.stickerMessage) {
      let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)
      let stickerMess = new Sticker(media, {
        pack: 'Bmw-mdtag',
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      msg = { sticker: stickerBuffer2, mentions: tag }
    } else {
      msg = { text: msgRepondu.conversation, mentions: tag }
    }
    await zk.sendMessage(dest, msg);
  } else {
    if (!arg || !arg[0]) return await sendFormattedMessage(zk, dest, 'Enter the text to announce or mention the message to announce', ms);
    await zk.sendMessage(dest, { text: arg.join(' '), mentions: tag });
    await sendFormattedMessage(zk, dest, arg.join(' '), ms);
  }
});
