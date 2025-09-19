const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "son",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎸"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    await zk.sendMessage(dest, { text: 'Searching for your song...' });
    console.log('Searching for song...');

    if (!arg) {
      return zk.sendMessage(dest, { text: 'Please provide a song name or keyword.' });
    }

    const query = arg.join(' ');
    console.log('[PLAY] Searching YT for:', query);
    const search = await ytSearch(query);
    const video = search.videos[0];

    if (!video) {
      return zk.sendMessage(dest, { text: 'No results found for your query.' });
    }

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.url)}&format=mp3`;

    const response = await axios.get(apiURL);
    const data = response.data;

    if (!data.downloadLink) {
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
    };

    await zk.sendMessage(dest, { text: 'Song found. Sending details...' });
    await zk.sendMessage(dest, message);
    console.log('Message sent with image and caption');

    await zk.sendMessage(dest, { text: 'Sending audio file...' });
    await zk.sendMessage(dest, {
      document: { url: data.downloadLink },
      mimetype: 'audio/mpeg',
      fileName,
      caption: 'Song downloaded'
    });
    console.log('Audio file sent');

  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
