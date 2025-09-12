const { fana } = require('../njabulo/fana');
const { attribuerUnevaleur } = require('../bdd/welcome');

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
   zk.sendMessage(chatId, {
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

async function events(nomCom) {
  fana({
    nomCom: nomCom,
    categorie: 'Group'
  }, async (dest, zk, commandeOptions) => {
    const { ms, arg, superUser, verifAdmin } = commandeOptions;

    if (verifAdmin || superUser) {
      if (!arg[0] || arg.join(' ') === ' ') {
        await sendFormattedMessage(zk, dest, nomCom + ' ' + 'on to active and ' + ' ' + nomCom + ' ' + 'off to put off', ms);
      } else {
        if (arg[0] === 'on' || arg[0] === 'off') {
          await attribuerUnevaleur(dest, nomCom, arg[0]);
          await sendFormattedMessage(zk, dest, nomCom + " is actualised on " + arg[0], ms);
        } else {
          await sendFormattedMessage(zk, dest, 'on for active and off for desactive', ms);
        }
      }
    } else {
      await sendFormattedMessage(zk, dest, 'You can\'t use this commands', ms);
    }
  });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
