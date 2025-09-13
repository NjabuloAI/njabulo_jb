const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre(`Alec-Jb\n😭 HEY ${nomAuteurMessage}, DON’T BE A SLACKER! Give me a prompt, like .imag Cute Cat! ?`);
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("Alec-Jb\n🤬🤬 try again later \n🤷🤷Oops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("Alec-Jb\n😡🤬 sorry No images found.");
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: "pinex🧏💫",
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
          }
        }
      }, { quoted: ms });
    }
  }
});
