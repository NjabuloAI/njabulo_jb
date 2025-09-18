const { fana } = require("../njabulo/fana");
const fancy = require("../njabulo/style");

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
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "🖋️message front text",
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

fana({ nomCom: "fancy", categorie: "Fun", reaction: "✍️" }, async (dest, zk, commandeOptions) => {
  const { arg, repondre, prefixe, ms } = commandeOptions;
  const id = arg[0]?.match(/\d+/)?.join('');
  const text = arg.slice(1).join(" ");

  try {
    if (id === undefined || text === undefined) {
      return await sendFormattedMessage(zk, dest, `\nExemple : ${prefixe}fancy 10 Njabulo Jb\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('Njabulo Jb 2025', fancy), ms);
    }

    const selectedStyle = fancy[parseInt(id) - 1];
    if (selectedStyle) {
      return await sendFormattedMessage(zk, dest, fancy.apply(selectedStyle, text), ms);
    } else {
      return await sendFormattedMessage(zk, dest, '_Style introuvable :(_', ms);
    }
  } catch (error) {
    console.error(error);
    return await sendFormattedMessage(zk, dest, '_Une erreur s\'est produite :(_', ms);
  }
});
