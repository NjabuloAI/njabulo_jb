const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "p",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎸"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    await zk.sendMessage(dest, {
      text: 'Searching for your song...',
    contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "🎸 YouTube downloader query",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: "https://files.catbox.moe/iii5jv.jpg",
         renderLargerThumbnail: false,
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
    console.log('Searching for song...');

    if (!arg) {
      console.log('No argument provided');
      return zk.sendMessage(dest, { text: 'Please provide a song name or keyword.' });
    }

    console.log('Argument provided:', arg);
    const query = arg.join(' ');
    console.log('Query:', query);

    console.log('[PLAY] Searching YT for:', query);
    const search = await ytSearch(query);
    console.log('Search result:', search);

    if (!search || !search.videos || !search.videos[0]) {
      console.log('No video found');
      return zk.sendMessage(dest, { text: 'No results found for your query.' });
    }

    const video = search.videos[0];
    console.log('Video found:', video);

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

    console.log('API URL:', apiURL);
    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        console.log('API request failed with status code:', response.status);
        await zk.sendMessage(dest, { text: 'Failed to retrieve the MP3 download link. Please try again later.' });
        return;
      }
      const data = response.data;
      if (!data.downloadLink) {
        console.log('No download link found');
        return zk.sendMessage(dest, { text: 'Failed to retrieve the MP3 download link.' });
      }

      const message = {
        image: { url: video.thumbnail },
        caption:
          `*SONG PLAYER*\n\n` +
          `╭───────────────◆\n` +
          `│⿻ *Title:* ${video.title}\n` +
          `│⿻ *Duration:* ${video.timestamp}\n` +
          `│⿻ *Views:* ${video.views.toLocaleString()}\n` +
          `│⿻ *Uploaded:* ${video.ago}\n` +
          `│⿻ *Channel:* ${video.author.name}\n` +
          `╰────────────────◆\n\n` +
          `🔗 ${video.url}`,
        contextInfo: {
        isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterJid: '120363345407274799@newsletter',
          newsletterName: "NJABULO JB",
          serverMessageId: 143,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "ɳᴊᴀʙᴜʟᴏ ᴊʙ σғғɪᴄᴇ",
            body: "fast via",
            thumbnailUrl: 'https://files.catbox.moe/7bnzea.jpg', // Add thumbnail URL if required 
            sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          }
          }
      };

      await zk.sendMessage(dest, message);
      console.log('Message sent with image and caption');

      await zk.sendMessage(dest, {
        audio: { url: data.downloadLink },
        mimetype: 'audio/mpeg',
        fileName,
        caption: 'Song downloaded'
      });
      console.log('Audio file sent');
    } catch (err) {
      console.error('[PLAY] API Error:', err);
      if (err.response && err.response.status === 500) {
        await zk.sendMessage(dest, { text: 'The API is currently experiencing issues. Please try again later.' });
      } else {
        await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
      }
    }
  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
