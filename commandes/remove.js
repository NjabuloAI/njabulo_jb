const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

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
  nomCom: "remove", 
  categorie: 'Group', 
  reaction: "👨🏿‍💼" 
}, async (chatId, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot, ms } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""

  if (!verifGroupe) { 
    return sendFormattedMessage(zk, chatId, "for groups only", ms);
  }

  const verifMember = (user) => {
    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      } else { 
        return true 
      }
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);
    }
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';

  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;

  try {
    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: 'Njabulo Jb', 
                author: nomAuteurMessage, 
                type: StickerTypes.FULL, 
                categories: ['🤩', '🎉'], 
                id: '12345', 
                quality: 50, 
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from the group.\n`
              await zk.groupParticipantsUpdate(chatId, [auteurMsgRepondu], "remove");
              sendFormattedMessage(zk, chatId, txt, ms);
              // zk.sendMessage(chatId, { text: txt, mentions: [auteurMsgRepondu] })
            } else { 
              sendFormattedMessage(zk, chatId, "This member cannot be removed because he is an administrator of the group.", ms);
            }
          } else { 
            sendFormattedMessage(zk, chatId, "This user is not part of the group.", ms);
          }
        } else { 
          sendFormattedMessage(zk, chatId, "Sorry, I cannot perform this action because I am not an administrator of the group.", ms);
        }
      } else { 
        sendFormattedMessage(zk, chatId, "please tag the member to be removed", ms);
      }
    } else { 
      sendFormattedMessage(zk, chatId, "Sorry I cannot perform this action because you are not an administrator of the group .", ms);
    }
  } catch (e) { 
    sendFormattedMessage(zk, chatId, "oups " + e, ms);
  }
});
