const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

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
  nomCom: "pair",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '🧃',
  categorie: 'system'
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return sendFormattedMessage(zk, chatId, "Example Usage: .code 2541111xxxxx.", ms);
  }

  try {
    await sendFormattedMessage(zk, chatId, "```Wait, generating your pairing code```", ms);

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
            title: "Put on your linked device",
            body: "Session",
            thumbnailUrl: 'https://files.catbox.moe/ipy7l3.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T',
            mediaType: 1,
            renderLargerThumbnail: true
          },
        },
      }, { quoted: ms });

      await sendFormattedMessage(zk, chatId, "Here is your pair code, copy and paste it to the notification above or link devices.", ms);
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    sendFormattedMessage(zk, chatId, "Error getting response from API.", ms);
  }
});