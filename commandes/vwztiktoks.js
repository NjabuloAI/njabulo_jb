const { fana } = require('../njabulo/fana');
const axios = require("axios");

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
         title: "njᥲbᥙᥣo jb",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: ms });
}

fana({
  nomCom: "tiktoksearch",
  aliases: ["tiksearch", "tiktoklist"],
  categorie: "Search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || !arg[0]) return await sendFormattedMessage(zk, dest, '🤦Please provide a query!', ms);

  try {
    const searchApiUrl = `https://tikwm.com/api/search?keywords=${encodeURIComponent(arg.join(' '))}`;
    const response = await axios.get(searchApiUrl);

    const searchData = response.data.data;
    if (!searchData || searchData.length === 0) return await sendFormattedMessage(zk, dest, "❌No TikTok search results found.", ms);

    let searchMessage = `VW GOLF PLANET TIKTOK SEARCH\n\n`;

    searchData.forEach((track, index) => {
      const trackNumber = index + 1;
      searchMessage += `*${trackNumber}.* ${track.title}\n`;
      searchMessage += `*Region*: ${track.region || "Unknown"}\n`;
      searchMessage += `*ID*: ${track.id}\n`;
      searchMessage += `*Video URL*: ${track.url}\n`;
      searchMessage += `*Cover Image*: ${track.cover}\n`;
      searchMessage += `*Views*: ${track.views || 0}\n`;
      searchMessage += `*Likes*: ${track.likes || 0}\n`;
      searchMessage += `*Comments*: ${track.comments || 0}\n`;
      searchMessage += `*Shares*: ${track.share || 0}\n`;
      searchMessage += `*Download Count*: ${track.download || 0}\n`;
      searchMessage += `────────────────\n\n`;
    });

    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
          },
        },
      },
    );
  } catch (error) {
    console.error(error);
    await sendFormattedMessage(zk, dest, `❌Error: ${error.message || 'Something went wrong.'}`, ms);
  }
});