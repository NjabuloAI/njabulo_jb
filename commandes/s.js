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
      if (response.data?.success) {
        return response.data;
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
  nomCom: "play",
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
        }, { quoted: {
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
        } });

    const apis = [
      `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(video.url)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(video.url)}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(video.url)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(video.url)}`
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

fana({
  nomCom: "video",
  aliases: ["videodoc", "film", "mp4"],
  categorie: "download",
  reaction: "🎬"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg[0]) {
      return repondre(zk, dest, ms, "Please provide a video name.");
    }

    const query = arg.join(" ");
    const video = await searchYouTube(query);
    
    await zk.sendMessage(dest, {
    image: { url: video.thumbnail},
    caption: `🎵 *${video.title}*\n> ⬇️ Njabulo Jb downloading video This may take a moment...",`,
    contextInfo: getContextInfo("Downloading", userJid, video.thumbnail)
    }, { quoted: ms });

    const apis = [
      `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(video.url)}`,
      `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(video.url)}`,
      `https://api.giftedtech.web.id/api/download/dlmp4?url=${encodeURIComponent(video.url)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(video.url)}`
    ];

    const downloadData = await downloadFromApis(apis);
    const { download_url, title } = downloadData.result;

    const messagePayloads = [
      {
        video: { url: download_url },
        mimetype: 'video/mp4',
        caption: `🎥 *${title}*`,
      },
      {
        document: { url: download_url },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`.replace(/[^\w\s.-]/gi, ''),
        caption: `📁 *${title}* (Document)\n> download and Subscribe by Alec-Jb`,
      }
    ];

    for (const payload of messagePayloads) {
      await zk.sendMessage(dest, payload, { quoted: ms });
    }

  } catch (error) {
    console.error('Video download error:', error);
    repondre(zk, dest, ms, `Download failed: ${error.message}`);
  }
});


    
