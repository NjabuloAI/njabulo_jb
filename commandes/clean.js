const { fana } = require('../njabulo/fana');

fana({
  nomCom: "clearchats",
  categorie: "owner",
  reaction: "🧹"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, isOwner } = commandeOptions;

  if (!isOwner) return repondre("You are not the owner!");

  try {
    const chats = await zk.chats.all();
    for (const chat of chats) {
      await zk.modifyChat(chat.jid, 'delete');
    }
    const message = `🧹 *Chats Cleared Successfully!* 🧹\n\n`;
    message += `*Total Chats Deleted:* ${chats.length}\n`;
    message += `*Status:* Success ✅`;
    repondre(message);
  } catch (error) {
    repondre(`❌ Error clearing chats: ${error.message}`);
  }
});
