const { fana } = require("../njabulo/fana");
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
         title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: true,
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

fana({
  nomCom: "lyrics",
  reaction: '🎵', 
  categorie: "Search",
  aliases: ["lyric", "mistari"] 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();

  if (!songName) {
    return sendFormattedMessage(zk, chatId, "*Pᥣᥱᥲsᥱ ρrovιdᥱ ᥲ song nᥲmᥱ. Exᥲmρᥣᥱ: ᥣყrιᥴs Shᥲρᥱ of Yoᥙ*", ms);
  }

  const apis = [
    `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(songName)}`,
    `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(songName)}`,
    `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(songName)}`
  ];

  let lyricsData;
  for (const api of apis) {
    try {
      const response = await axios.get(api);
      if (response.data?.result?.lyrics) {
        lyricsData = response.data;
        break;
      }
    } catch (error) {
      console.error(`API ${api} failed:`, error.message);
    }
  }

  if (!lyricsData?.result) {
    return sendFormattedMessage(zk, chatId, "*Coᥙᥣdn't fιnd ᥣყrιᥴs for*" + songName + "*", ms);
  }

  const { title, artist, thumb, lyrics } = lyricsData.result;
  const imageUrl = thumb || "https://files.catbox.moe/b2vql7.jpg"; 

  try {
    const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
    
    await zk.sendMessage(chatId, {
      image: Buffer.from(imageResponse.data),
      caption: `🎶 *${title}* - ${artist}\n\n${lyrics}\n\n*Powered by Njabulo Jb*`,
      contextInfo: {
          externalAdReply: {
          title: "Lyrics Finder",
          body: "Get any song lyrics instantly",
          thumbnail: Buffer.from(imageResponse.data),
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: ""
        }
      }
    }, { quoted: ms });

  } catch (error) {
    console.error("Error sending lyrics:", error);
    sendFormattedMessage(zk, chatId, `🎶 *${title}* - ${artist}\n\n${lyrics.substring(0, 2000)}...\n\n*[Truncated - image failed to load]*`, ms);
  }
});