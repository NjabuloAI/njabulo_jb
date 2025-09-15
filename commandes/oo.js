const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "imgs",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "📸"
}, async (dest, zk, commandeOptions) => {
  console.log(`img command used with args: ${commandeOptions.arg.join(" ")}`);

  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");

  for (let i = 0; i <= 100; i++) {
    await repondre(`Searching for ${searchTerm}... ${i}%`);
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("Oops, an error occurred.");
      console.log(`Error occurred while searching for ${searchTerm} images: ${error}`);
      return;
    }
    if (!results || results.length === 0) {
      repondre("No images found.");
      console.log(`No images found for ${searchTerm}`);
      return;
    }

    const buttons = [
      { 
        buttonId: `img ${searchTerm}`, 
        buttonText: { displayText: `Search more ${searchTerm} images` }, 
        type: 1 
      }
    ];

    const btn = {
      text: `Here are some images of ${searchTerm}`,
      footer: 'VW-GOLF',
      buttons: buttons,
      headerType: 4,
      image: { url: results[0].url }
    };

    zk.sendMessage(dest, btn, { quoted: ms });
    console.log(`Sending images of ${searchTerm} to ${dest}`);

    for (let i = 1; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `DOWNLOAD AND ENJOY BY VW-GOLF`,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363345407274799@newsletter',
            newsletterName: "vw-golf",
            serverMessageId: 143,
          }
        }
      }, { quoted: ms });
    }
  }
});
