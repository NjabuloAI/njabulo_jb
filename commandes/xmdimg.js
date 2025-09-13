const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "☘️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

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
    

  if (!arg[0]) {
    zk.sendMessage(dest, {
    text: "Wich image name you want",
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
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("Oops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("No images found.");
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `Njabulo Jb downloader image`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
          }
        }
      }, { quoted: ms });
    }
  }
});

           
