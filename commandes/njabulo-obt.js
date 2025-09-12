const JavaScriptObfuscator = require("javascript-obfuscator");
const { fana } = require("../njabulo/fana");
const conf = require("../set");

fana({
  nomCom: "obts",
  categorie: 'General'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg[0]) {
    const buttons = [
      { buttonId: 'help', buttonText: { displayText: 'Help' }, type: 1 }
    ];

    zk.sendMessage(dest, {
      text: "After the command, provide a valid JavaScript code for encryption",
      buttons,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "JavaScript Obfuscator",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });
    return;
  }

  try {
    const code = arg.join(" ");
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    });

    const buttons = [
      { buttonId: 'obfuscate_again', buttonText: { displayText: 'Obfuscate Again' }, type: 1 },
      { buttonId: 'clear', buttonText: { displayText: 'Clear' }, type: 1 }
    ];

    zk.sendMessage(dest, {
      text: obfuscatedCode.getObfuscatedCode(),
      buttons,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Obfuscated Code",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error(error);
    await zk.sendMessage(dest, {
      text: "Something is wrong, check if your code is logical and has the correct syntax",
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Error",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });
  }
});
