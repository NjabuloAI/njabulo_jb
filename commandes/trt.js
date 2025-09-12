const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require("child_process");

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

fana({ nomCom: "trt", categorie: "Use", reaction: "💗" }, async (chatId, zk, commandeOptions) => {

  const { msgRepondu, repondre, arg, ms } = commandeOptions;

  if (msgRepondu) {
    try {
      if (!arg || !arg[0]) {
        sendFormattedMessage(zk, chatId, "(eg : trt en)", ms);
        return;
      }

      let texttraduit = await traduire(msgRepondu.conversation, { to: arg[0] });
      sendFormattedMessage(zk, chatId, texttraduit, ms);

    } catch (error) {
      sendFormattedMessage(zk, chatId, "*Mᥱntιon ᥲ tᥱxt mᥱssᥲgᥱ*", ms);
    }
  } else {
    sendFormattedMessage(zk, chatId, "*Mᥱntιon ᥲ tᥱxt mᥱssᥲgᥱ*", ms);
  }
});