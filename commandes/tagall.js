const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

fana({
  nomCom: "tagall",
  categorie: 'Group',
  reaction: "💬"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) {
    repondre("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }

  if (!arg || arg === ' ') {
    mess = 'Aucun Message';
  } else {
    mess = arg.join(' ');
  }

  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
  var tag = "";
  tag += `╭─────────────────━┈⊷*
│ *☆ɴᴊᴀʙᴜʟᴏ-ᴊʙ☆*
╰─────────────────━┈⊷ 
│⭕ *Group* : ${nomGroupe}
│⭕ *Hey😀* : *${nomAuteurMessage}*
│⭕ *Message* : *${mess}*
╰─────────────━┈⊷\n \n`;

  let emoji = ['🚔', '💗', '🚀', '❌', '⛱️', '🖥️', '🗂️', '🔧', '🎊', '😡', '🙏🏿', '🚬', '$', '😟', '🔰', '🟢'];
  let random = Math.floor(Math.random() * (emoji.length - 1));

  for (const membre of membresGroupe) {
    tag += `${emoji[random]} @${membre.id.split("@")[0]}\n`;
  }

  if (verifAdmin || superUser) {
    const button = {
      "buttonText": "👋 Hello!",
      "type": 1,
      "sections": [
        {
          "title": "Tag All",
          "rows": [
            {
              "title": "Tag All Members",
              "description": "Tag all members in the group",
              "rowId": "tagall"
            }
          ]
        }
      ]
    };

    zk.sendMessage(dest, {
      text: tag,
      mentions: membresGroupe.map((i) => i.id),
      footer: "Njabulo-JB",
      buttons: [button]
    }, { quoted: ms });
  } else {
    repondre('command reserved for admins');
  }
});
