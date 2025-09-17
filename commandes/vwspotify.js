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
  nomCom: "spotifylist",
  aliases: ["spotifysearch", "splaylist"],
  categorie: "Search",
  reaction: "🎬"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg[0]) return await sendFormattedMessage(zk, dest, '🤦Please provide a query!', ms);

  try {
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(arg[0])}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    if (!searchData || searchData.length === 0) return await sendFormattedMessage(zk, dest, "⁉️No Spotify search results found.", ms);

    let playlistMessage = `VW GOLF PLANET SPOTIFY PLAY\n\n`;

    searchData.forEach((track, index) => {
      const trackNumber = index + 1;
      playlistMessage += `*${trackNumber}.* ${track.title}\n`;
      playlistMessage += `*Artist*: ${track.artist || "Unknown"}\n`;
      playlistMessage += `*Album*: ${track.album || "Unknown"}\n`;
      playlistMessage += `*URL*: ${track.url}\n\n`;
      playlistMessage += `─────────────\n\n`;
    });

    await zk.sendMessage(
      dest,
      {
        text: playlistMessage,
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
    await sendFormattedMessage(zk, dest, `❌Error: ${error.message}`, ms);
    console.error(error);
  }
})