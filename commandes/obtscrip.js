const JavaScriptObfuscator = require("javascript-obfuscator");
const {
  fana
} = require("../njabulo/fana");

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

fana({
  'nomCom': "ob",
  'categorie': 'General'
}, async (chatId, zk, commandeOptions) => {
  const {
    ms,
    arg,
    repondre,
    auteurMessage,
    nomAuteurMessage,
    msgRepondu,
    auteurMsgRepondu
  } = commandeOptions;

  try {
    let code = arg.join(" ");
    if (!arg[0]) {
      sendFormattedMessage(zk, chatId, "*Aftᥱr thᥱ ᥴommᥲnd, ρrovιdᥱ ᥲ vᥲᥣιd JᥲvᥲSᥴrιρt ᥴodᥱ for ᥱnᥴrყρtιon*", ms);
      return;
    };

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
      'compact': true,
      'controlFlowFlattening': true,
      'controlFlowFlatteningThreshold': 1,
      'numbersToExpressions': true,
      'simplify': true,
      'stringArrayShuffle': true,
      'splitStrings': true,
      'stringArrayThreshold': 1
    });

    await sendFormattedMessage(zk, chatId, obfuscatedCode.getObfuscatedCode(), ms);
  } catch {
    sendFormattedMessage(zk, chatId, "*Somᥱthιng ιs ᥕrong, ᥴhᥱᥴk ιf ყoᥙr ᥴodᥱ ιs ᥣogιᥴᥲᥣ ᥲnd hᥲs thᥱ ᥴorrᥱᥴt sყntᥲx*", ms);
  }
});