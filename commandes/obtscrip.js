const JavaScriptObfuscator = require("javascript-obfuscator");
const {
  fana
} = require("../njabulo/fana");

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
      sendFormattedMessage(zk, chatId, "After the command, provide a valid JavaScript code for encryption", ms);
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
    sendFormattedMessage(zk, chatId, "Something is wrong, check if your code is logical and has the correct syntax", ms);
  }
});