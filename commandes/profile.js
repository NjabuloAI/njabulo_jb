const { fana } = require("../njabulo/fana");
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
  nomCom: "profile",
  aliases: ["pp", "who"],
  desc: "to generate profile picture",
  categorie: "Use"
}, async (chatId, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  let jid = null;
  let nom = null;

  try {
    if (!msgRepondu) {
      jid = auteurMessage; 
      nom = nomAuteurMessage; 
    } else {
      jid = auteurMsgRepondu; 
      nom = "@" + auteurMsgRepondu.split("@")[0];
    }

    let ppUrl;
    try {
      ppUrl = await zk.profilePictureUrl(jid, 'image'); 
    } catch (error) {
      console.error('Error retrieving profile picture:', error);
      ppUrl = conf.URL; 
    }

    let status;
    try {
      status = await zk.fetchStatus(jid); 
    } catch (error) {
      console.error('Error retrieving user status:', error);
      status = { status: "About not accessible due to user privacy" }; 
    }

    const mess = {
      image: { url: ppUrl },
      caption: `Name: ${nom}\nAbout:\n${status.status}`, 
      mentions: msgRepondu ? [auteurMsgRepondu] : []
    };

    await zk.sendMessage(chatId, mess, { quoted: ms }); 

  } catch (error) {
    console.error('Unexpected error in profile command:', error); 
    sendFormattedMessage(zk, chatId, "An error occurred", ms);
  }
});