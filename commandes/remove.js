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
         title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: true,
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
  nomCom: "remove", 
  categorie: 'Group', 
  reaction: "👨🏿‍💼" 
}, async (chatId, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot, ms } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""

  if (!verifGroupe) { 
    return sendFormattedMessage(zk, chatId, "*for groᥙρ onᥣყ*", ms);
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
              sendFormattedMessage(zk, chatId, "*Thιs mᥱmbᥱr ᥴᥲnnot bᥱ rᥱmovᥱd bᥱᥴᥲᥙsᥱ hᥱ ιs ᥲn ᥲdmιnιstrᥲtor of thᥱ groᥙρ*", ms);
            }
          } else { 
            sendFormattedMessage(zk, chatId, "*Thιs ᥙsᥱr ιs not ρᥲrt of thᥱ groᥙρ*", ms);
          }
        } else { 
          sendFormattedMessage(zk, chatId, "*sorrყ, I ᥴᥲnnot ρᥱrform thιs ᥲᥴtιon bᥱᥴᥲᥙsᥱ I ᥲm not ᥲn ᥲdmιnιstrᥲtor of thᥱ groᥙρ*", ms);
        }
      } else { 
        sendFormattedMessage(zk, chatId, "*ρᥣᥱᥲsᥱ tᥲg thᥱ mᥱmbᥱr to bᥱ rᥱmovᥱd*", ms);
      }
    } else { 
      sendFormattedMessage(zk, chatId, "*Sorrყ I ᥴᥲnnot ρᥱrform thιs ᥲᥴtιon bᥱᥴᥲᥙsᥱ ყoᥙ ᥲrᥱ not ᥲn ᥲdmιnιstrᥲtor of thᥱ groᥙρ*", ms);
    }
  } catch (e) { 
    sendFormattedMessage(zk, chatId, "oups " + e, ms);
  }
});
