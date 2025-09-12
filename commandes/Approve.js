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
