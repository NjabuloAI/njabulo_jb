const { fana } = require("../njabulo/fana")
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
     externalAdReply: {
         title: "njᥲbᥙᥣo jb",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: ms });
}

fana({ nomCom: "promote", categorie: 'Group', reaction: "🫂" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot, ms } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) return await sendFormattedMessage(zk, dest, "fσr grσups σnlч", ms);

  const verifMember = (user) => membresGroupe.some((m) => m.id === user);
  const memberAdmin = (membresGroupe) => membresGroupe.filter((m) => m.admin !== null).map((m) => m.id);
  const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
  const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
  const zkad = verifGroupe ? admins.includes(idBot) : false;

  try {
    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (verifMember(auteurMsgRepondu)) {
            if (!admins.includes(auteurMsgRepondu)) {
              var txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} rose in rank.\nhe/she has been named group administrator.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else return await sendFormattedMessage(zk, dest, "This member is already an administrator of the group.", ms);
          } else return await sendFormattedMessage(zk, dest, "thís usєr ís nσt pαrt σf thє grσup.", ms);
        } else return await sendFormattedMessage(zk, dest, "Sorry, I cannot perform this action because I am not an administrator of the group.", ms);
      } else return await sendFormattedMessage(zk, dest, "please tag the member to be nominated", ms);
    } else return await sendFormattedMessage(zk, dest, "Sorry I cannot perform this action because you are not an administrator of the group.", ms);
  } catch (e) { await sendFormattedMessage(zk, dest, "oups " + e, ms) }
});

fana({ nomCom: "demote", categorie: 'Group', reaction: "😨" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot, ms } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) return await sendFormattedMessage(zk, dest, "fσr grσups σnlч", ms);

  const verifMember = (user) => membresGroupe.some((m) => m.id === user);
  const memberAdmin = (membresGroupe) => membresGroupe.filter((m) => m.admin !== null).map((m) => m.id);
  const admins = verifGroupe ? memberAdmin(membresGroupe) : [];
  const autAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
  const zkad = verifGroupe ? admins.includes(idBot) : false;

  try {
    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (verifMember(auteurMsgRepondu)) {
            if (admins.includes(auteurMsgRepondu)) {
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from his position as a group administrator\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else return await sendFormattedMessage(zk, dest, "This member is not a group administrator.", ms);
          } else return await sendFormattedMessage(zk, dest, "thís usєr ís nσt pαrt σf thє grσup.", ms);
        } else return await sendFormattedMessage(zk, dest, "sσrrч αm nσt αn αdmínístrαtσr σf thє grσup.", ms);
      } else return await sendFormattedMessage(zk, dest, "please tag the member to be removed", ms);
    } else return await sendFormattedMessage(zk, dest, "Sorry I cannot perform this action because you are not an administrator of the group.", ms);
  } catch (e) { await sendFormattedMessage(zk, dest, "oups " + e, ms) }
});