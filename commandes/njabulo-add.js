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
  'nomCom': 'add',
  'categorie': "Group",
  'reaction': '🪄'
}, async (chatId, zk, context) => {
  let { repondre, verifAdmin, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot, arg } = context;

  if (!verifGroupe) {
    return sendFormattedMessage(zk, chatId, "This command works in groups only!", msgRepondu);
  }

  if (!superUser) {
    sendFormattedMessage(zk, chatId, "You are too weak to do that", msgRepondu);
    return;
  }

  if (!verifAdmin) {
    sendFormattedMessage(zk, chatId, "You are not an admin here!", msgRepondu);
    return;
  }

  let groupMetadata;
  try {
    groupMetadata = await zk.groupMetadata(chatId);
  } catch (error) {
    return sendFormattedMessage(zk, chatId, "Failed to fetch group metadata.", msgRepondu);
  }

  let participants = groupMetadata.participants;
  if (!arg[0]) {
    return sendFormattedMessage(zk, chatId, "Provide number to be added. Example:\nadd 254XXXXX747", msgRepondu);
  }

  let numbers = arg.join(" ");
  const participantIds = participants.map(participant => participant.id);
  let alreadyInGroup = [];
  let numbersToAdd = [];

  try {
    const numbersData = await Promise.all(numbers.split(',').map(number => number.replace(/[^0-9]/g, '')).filter(number => number.length > 4 && number.length < 14).map(async number => [number, await zk.onWhatsApp(number + "@s.whatsapp.net")]));
    numbersData.forEach(([number, exists]) => {
      const jid = number + "@s.whatsapp.net";
      if (participantIds.includes(jid)) {
        alreadyInGroup.push(jid);
      } else if (exists[0]?.["exists"]) {
        numbersToAdd.push(number + "@c.us");
      }
    });
  } catch (error) {
    return sendFormattedMessage(zk, chatId, "Error validating phone numbers.", msgRepondu);
  }

  for (const jid of alreadyInGroup) {
    sendFormattedMessage(zk, chatId, "That user is already in this group!", msgRepondu);
  }

  let response;
  try {
    if (numbersToAdd.length > 0) {
      response = await zk.query({
        'tag': 'iq',
        'attrs': {
          'type': 'set',
          'xmlns': "w:g2",
          'to': chatId
        },
        'content': numbersToAdd.map(jid => ({
          'tag': "add",
          'attrs': {},
          'content': [{
            'tag': "participant",
            'attrs': {
              'jid': jid
            }
          }]
        }))
      });

      for (const jid of numbersToAdd) {
        sendFormattedMessage(zk, chatId, "Successfully added @" + jid.split('@')[0], msgRepondu);
      }
    }
  } catch (error) {
    return sendFormattedMessage(zk, chatId, "Failed to add user to the group!", msgRepondu);
  }

  let groupPicture;
  try {
    groupPicture = await zk.profilePictureUrl(chatId, "image").catch(() => "https://i.ibb.co/n6rw805/694affc7ca5a5fb0cb58c2b4533f962d.jpg");
  } catch (error) {
    groupPicture = "https://i.ibb.co/n6rw805/694affc7ca5a5fb0cb58c2b4533f962d.jpg";
  }

  let buffer = Buffer.alloc(0);
  if (groupPicture) {
    try {
      const response = await fetch(groupPicture);
      if (response.ok) {
        buffer = await response.buffer();
      } else {
        console.error("Failed to fetch profile picture:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }

  const addNode = response?.["content"]["find"](node => node.tag === "add");
  const failedAdditions = addNode?.["content"]['filter'](node => node.attrs.error == 403);

  let inviteCode;
  try {
    inviteCode = await zk.groupInviteCode(chatId);
  } catch (error) {
    return sendFormattedMessage(zk, chatId, "Failed to generate group invite code.", msgRepondu);
  }

  for (const node of failedAdditions || []) {
    const jid = node.attrs.jid;
    const addRequestNode = node.content.find(node => node.tag === "add_request");
    const code = addRequestNode.attrs.code;
    const expiration = addRequestNode.attrs.expiration;
    const message = "I cannot add @" + jid.split('@')[0] + " due to privacy settings, Let me send an invite link instead.";
    await sendFormattedMessage(zk, chatId, message, msgRepondu);

    let inviteMessage = "You have been invited to join the group " + groupMetadata.subject + ":\n\nhttps://chat.whatsapp.com/" + inviteCode + "\n\n*POWERED BY POPKID_MD*";
    await zk.sendMessage(jid, {
      'image': {
        'url': groupPicture
      },
      'caption': inviteMessage
    }, {
      'quoted': msgRepondu
    });
  }
});