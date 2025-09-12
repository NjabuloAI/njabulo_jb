const { fana } = require("../njabulo/fana");

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

fana(
  {
    nomCom: "getpp",
    categorie: "General",
    reaction: "📷",
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;

    if (!msgRepondu) {
      return sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 Don’t make Njabulo Jb do extra work! 🤔`, ms);
    }

    try {
      await sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, Njabulo Jb’s hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍`, ms);

      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 Njabulo Jb’s got you my pic instead! 😎`, ms);
      }

      await zk.sendMessage(
        chatId,
        {
          image: { url: ppuser },
          caption: `BOOM, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥`,
          mentions: [auteurMsgRepondu],
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in .getpp command:", error);
      await sendFormattedMessage(zk, chatId, `TOTAL BUST, ${nomAuteurMessage}! Njabulo Jb crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣`, ms);
    }
  }
);
