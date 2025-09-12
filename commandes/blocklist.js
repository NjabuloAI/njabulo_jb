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

fana({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '🍂',
  categorie: "Search"
}, async (chatId, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    let blocklist = await zk.fetchBlocklist();

    if (blocklist.length > 0) {
      let jackhuh = `*Blocked Contacts*\n`;

      await sendFormattedMessage(zk, chatId, `You have blocked ${blocklist.length} contact(s), fetching and sending their details!`, ms);

      const promises = blocklist.map(async (blockedUser) => {
        const phoneNumber = blockedUser.split('@')[0];

        jackhuh += `🤷  +${phoneNumber}\n`; 
      });

      await Promise.all(promises);

      await sendFormattedMessage(zk, chatId, jackhuh, ms);
    } else {
      await sendFormattedMessage(zk, chatId, "There are no blocked contacts.", ms);
    }
  } catch (e) {
    await sendFormattedMessage(zk, chatId, "An error occurred while accessing blocked users.\n\n" + e, ms);
  }
});