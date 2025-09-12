const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot")
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
          title: `ᥕᥱᥣᥴomᥱ fᥲmιᥣყ `,
           mediaType: 1,
          previewType: 0,
              renderLargerThumbnail: false,
              thumbnailUrl: randomNjabulourl,
                     
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
  nomCom: "antilink", 
  categorie: 'Group', 
  reaction: "🔗" 
}, async (chatId, zk, commandeOptions) => {
  var { repondre, arg, verifGroupe, superUser, verifAdmin, ms } = commandeOptions;

  if (!verifGroupe) {
    return sendFormattedMessage(zk, chatId, "*for groups only*", ms);
  }

  if (superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(chatId)
    try {
      if (!arg || !arg[0] || arg === ' ') { 
        sendFormattedMessage(zk, chatId, "antilink on to activate the anti-link feature*\n*antilink off o deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.*", ms);
        return;
      }

      if (arg[0] === 'on') {
        if (enetatoui) { 
          sendFormattedMessage(zk, chatId, "*the antilink is already activated for this group*", ms);
        } else {
          await ajouterOuMettreAJourJid(chatId, "oui");
          sendFormattedMessage(zk, chatId, "*the antilink is activated successfully*", ms);
        }
      } else if (arg[0] === "off") {
        if (enetatoui) { 
          await ajouterOuMettreAJourJid(chatId, "non");
          sendFormattedMessage(zk, chatId, "*The antilink has been successfully deactivated*", ms);
        } else {
          sendFormattedMessage(zk, chatId, "*antilink is not activated for this group*", ms);
        }
      } else if (arg.join('').split("/")[0] === 'action') {
        let action = (arg.join('').split("/")[1]).toLowerCase();

        if (action == 'remove' || action == 'warn' || action == 'delete') {
          await mettreAJourAction(chatId, action);
          sendFormattedMessage(zk, chatId, `*The anti-link action has been updated to ${arg.join('').split("/")[1]}*`, ms);
        } else {
          sendFormattedMessage(zk, chatId, "The only actions available are warn, remove, and delete*", ms);
        }
      } else {
        sendFormattedMessage(zk, chatId, "*antilink on to activate the anti-link feature*\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.", ms);
      }
    } catch (error) {
      sendFormattedMessage(zk, chatId, error, ms);
    }
  } else { 
    sendFormattedMessage(zk, chatId, '*You are not entitled to this order*', ms);
  }
});
