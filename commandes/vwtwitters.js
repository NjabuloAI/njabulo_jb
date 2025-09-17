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
  nomCom: "twittersearch",
  aliases: ["xsearch", "twitterlist", "tweetsearch"],
  categorie: "Search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg[0]) return await sendFormattedMessage(zk, dest, '🤦Please provide a thing!', ms);

  try {
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(arg[0])}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;

    if (!searchData || searchData.length === 0) return await sendFormattedMessage(zk, dest, "❌No Twitter search results found.", ms);

    let searchMessage = `VW GOLF PLANET TWITTER SEARCH\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;

    searchData.forEach((track, index) => {
      const trackNumber = index + 1;
      searchMessage += `*${trackNumber}.* ${track.user}\n`;
      searchMessage += `*Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*Post*: ${track.post}\n`;
      searchMessage += `*User Link*: ${track.user_link}\n`;
      searchMessage += `──────────────\n\n`;
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
      }
    );
  } catch (error) {
    console.error(error);
    await sendFormattedMessage(zk, dest, `❌Error: ${error.message || 'Something went wrong.'}`, ms);
  }
});