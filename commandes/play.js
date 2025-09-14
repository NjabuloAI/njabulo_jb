const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

// Common contextInfo configuration
const getContextInfo = (title = '', userJid = '', thumbnailUrl = '') => ({
  mentionedJid: [userJid],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363345407274799@newsletter",
    newsletterName: "╭••➤®Njabulo Jb",
    serverMessageId: Math.floor(100000 + Math.random() * 900000),
  },
  externalAdReply: {
    title: "🎧YoᥙTᥙbᥱ doᥕnᥣoᥲdᥱr",
    mediaType: 1,
    previewType: 0,
    thumbnailUrl: thumbnailUrl || conf.URL || '',
    renderLargerThumbnail: true 
  }
});

// Common function for YouTube search
async function searchYouTube(query) {
  try {
    const searchResults = await ytSearch(query);
    if (!searchResults?.videos?.length) {
      throw new Error('No video found for the specified query.');
    }
    return searchResults.videos[0];
  } catch (error) {
    console.error('YouTube search error:', error);
    throw new Error(`YouTube search failed: ${error.message}`);
  }
}

// Common function for downloading media from APIs
async function downloadFromApis(apis) {
  for (const api of apis) {
    try {
      const response = await axios.get(api, { timeout: 15000 });
      if (api.includes('princetechn')) {
        if (response.data.status === 'success') {
          return {
            result: {
              download_url: response.data.result.download_link,
              title: response.data.result.title
            }
          };
        }
      } else {
        if (response.data?.success) {
          return response.data;
        }
      }
    } catch (error) {
      console.warn(`API ${api} failed:`, error.message);
      continue;
    }
  }
  throw new Error('Failed to retrieve download URL from all sources.');
}

// Audio download command
fana({
  nomCom: "pla",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎶"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide a song name.");
    }

    const query = arg.join(" ");
    const video = await searchYouTube(query);
    
    await zk.sendMessage(dest, {
      text: `🎧 *tιtᥣᥱ:* ${video.title}

*📥ᥲᥙtomᥲtιᥴ ᥲᥙdιo & doᥴ*

*1.* 🎵 Doᥕnᥣoᥲd Aᥙdιo
*2.* 🎥 Doᥕnᥣoᥲd Vιdᥱo `,
      contextInfo: getContextInfo("Downloading", userJid, video.thumbnail)
    }, { 
      quoted: {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          remoteJid: "status@broadcast"
        },
        message: {
          contactMessage: {
            displayName: "NנɐႦυℓσ נႦ✆︎",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
          }
        }
      } 
    });

    const apis = [
      `https://api.princetechn.com/api/download/ytmp3?url=${encodeURIComponent(video.url)}&apikey=YOUR_API_KEY`
    ];

    const downloadData = await downloadFromApis(apis);
    const { download_url, title } = downloadData.result;

    const messagePayloads = [
      {
        audio: { url: download_url },
        mimetype: 'audio/mp4',
        caption: `🎵 *${title}*`,
      },
      {
        document: { url: download_url },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`.replace(/[^\w\s.-]/gi, ''),
        caption: `📁 *${title}* (Document)\n> download and Subscribe by Alec-Jb`,
      }
    ];

    for (const payload of messagePayloads) {
      await zk.sendMessage(dest, payload, { quoted: ms });
    }

  } catch (error) {
    console.error('Audio download error:', error);
    repondre(zk, dest, ms, `Download failed: ${error.message}`);
  }
});
