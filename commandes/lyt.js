const { fana } = require("../njabulo/fana");
const axios = require("axios");

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
  nomCom: "lyrics",
  reaction: '🎵', 
  categorie: "Search",
  aliases: ["lyric", "mistari"] 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();

  if (!songName) {
    return sendFormattedMessage(zk, chatId, "Please provide a song name. Example: *lyrics Shape of You*", ms);
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
    return sendFormattedMessage(zk, chatId, "❌ Couldn't find lyrics for *" + songName + "*", ms);
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