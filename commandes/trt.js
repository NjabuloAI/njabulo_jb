const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require("child_process");

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
      sendFormattedMessage(zk, chatId, "Mention a text message", ms);
    }
  } else {
    sendFormattedMessage(zk, chatId, "Mention a text message", ms);
  }
});