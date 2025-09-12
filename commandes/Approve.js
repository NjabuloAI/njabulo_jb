const { exec } = require("child_process");
const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require('../bdd/antilien');
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require('../bdd/antibot');
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require("../set");
const axios = require("axios");
const { getBinaryNodeChild, getBinaryNodeChildren } = require("@whiskeysockets/baileys");

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
         title: "njᥲbᥙᥣo jb",
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

fana({
  'nomCom': 'approve',
  'aliases': ["approve-all", "accept"],
  'categorie': "Group",
  'reaction': '🔎'
}, async (chatId, zk, context) => {
  const { repondre, verifGroupe, verifAdmin, ms } = context;

  if (!verifGroupe) {
    sendFormattedMessage(zk, chatId, "This command works in groups only", ms);
    return;
  }

  if (!verifAdmin) {
    sendFormattedMessage(zk, chatId, "You are not an admin here!", ms);
    return;
  }

  const pendingRequests = await zk.groupRequestParticipantsList(chatId);
  if (pendingRequests.length === 0) {
    return sendFormattedMessage(zk, chatId, "There are no pending join requests.", ms);
  }

  for (const request of pendingRequests) {
    const response = await zk.groupRequestParticipantsUpdate(chatId, [request.jid], 'approve');
    console.log(response);
  }

  sendFormattedMessage(zk, chatId, "```All pending participants have been approved to join by Njabulo Jb```.", ms);
});
