const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, { 
    text, 
    contextInfo: { 
      externalAdReply: { 
        title: "Njabulo Jb", 
        body: "Message via ad !", 
        thumbnailUrl: "https:                                                  
        sourceUrl: "//whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u", 
        sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u", 
        mediaType: 1, 
        showAdAttribution: true 
      } 
    } 
  }, { quoted: ms });
}

fana({ 
  nomCom: "img", 
  aliases: ["image", "images"], 
  categorie: "Images", 
  reaction: "📷" 
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    sendFormattedMessage(zk, dest, 'Which image?', ms);
    return;
  }

  const searchTerm = arg.join(" ");

  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      sendFormattedMessage(zk, dest, "Oops, an error occurred.", ms);
      return;
    }

    if (!results || results.length === 0) {
      sendFormattedMessage(zk, dest, "No images found.", ms);
      return;
    }

    const message = `*Image Search Result*\n` +
      `╭───────────────◆\n` +
      `│⿻ *Search Term:* ${searchTerm}\n` +
      `│⿻ *Results:* ${results.length}\n` +
      `╰────────────────◆\n` +
      `Reply With: *1* To Download First Image 📸 *2* To Download All Images 📸`;

    sendFormattedMessage(zk, dest, message, ms);

    zk.on('message', async (msg) => {
      if (msg.body === '1') {
        // Download first image
        zk.sendMessage(dest, { 
          image: { url: results[0].url }, 
          caption: `*Downloaded by ${conf.BOT}*`, 
          contextInfo: { 
            externalAdReply: { 
              title: "Image Search Result", 
              body: `Here's the image you searched for: ${searchTerm}`, 
              thumbnailUrl: results[0].url, 
              sourceUrl: conf.GURL, 
              mediaType: 1, 
              showAdAttribution: true 
            } 
          } 
        }, { quoted: ms });
      } else if (msg.body === '2') {
        // Download all images
        for (let i = 0; i < Math.min(results.length, 5); i++) {
          zk.sendMessage(dest, { 
            image: { url: results[i].url }, 
            caption: `*Downloaded by ${conf.BOT}*`, 
            contextInfo: { 
              externalAdReply: { 
                title: "Image Search Result", 
                body: `Here's the image you searched for: ${searchTerm}`, 
                thumbnailUrl: results[i].url, 
                sourceUrl: conf.GURL, 
                mediaType: 1, 
                showAdAttribution: true 
              } 
            } 
          }, { quoted: ms });
        }
      }
    });
  }
});
