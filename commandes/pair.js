const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

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
  nomCom: "pair",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '📡',
  categorie: 'system'
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return sendFormattedMessage(zk, chatId, "*ᥱntᥱr ყoᥙr nᥙmbᥱr ᥣιkᥱ .ρᥲιr +267*", ms);
  }

  try {
    await sendFormattedMessage(zk, chatId, "*Wᥲιt, gᥱnᥱrᥲtιng ყoᥙr ρᥲιrιng ᥴodᥱ*", ms);

    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://vw-session-ld.onrender.com/code?number=${encodedNumber}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(chatId, {
        text: pairingCode,
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

      await sendFormattedMessage(zk, chatId, "*Hᥱrᥱ ιs ყoᥙr ρᥲιr ᥴodᥱ, ᥴoρყ ᥲnd ρᥲstᥱ ιt to thᥱ notιfιᥴᥲtιon ᥲbovᥱ or ᥣιnk dᥱvιᥴᥱs*", ms);
    } else {
      throw new Error("*Invᥲᥣιd rᥱsρonsᥱ from API.*");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    sendFormattedMessage(zk, chatId, "Error getting response from API.", ms);
  }
});
