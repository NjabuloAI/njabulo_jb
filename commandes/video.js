const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "video",
  aliases: ["vid", "mp4", "movie"],
  categorie: "download",
  reaction: "🎥"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    await zk.sendMessage(dest, { text: 'Searching for your video...' });
    console.log('Searching for video...');

    if (!arg) {
      console.log('No argument provided');
      return zk.sendMessage(dest, { text: 'Please provide a video name or keyword.' });
    }

    console.log('Argument provided:', arg);
    const query = arg.join(' ');
    console.log('Query:', query);

    console.log('[VIDEO] Searching YT for:', query);
    const search = await ytSearch(query);
    console.log('Search result:', search);

    if (!search || !search.videos || !search.videos[0]) {
      console.log('No video found');
      return zk.sendMessage(dest, { text: 'No results found for your query.' });
    }

    const video = search.videos[0];
    console.log('Video found:', video);

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp4`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp4`;

    console.log('API URL:', apiURL);
    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        console.log('API request failed with status code:', response.status);
        await zk.sendMessage(dest, { text: 'Failed to retrieve the MP4 download link. Please try again later.' });
        return;
      }
      const data = response.data;
      if (!data.downloadLink) {
        console.log('No download link found');
        return zk.sendMessage(dest, { text: 'Failed to retrieve the MP4 download link.' });
      }

      const message = {
        image: { url: video.thumbnail },
        caption:
          `*VIDEO PLAYER*\n\n` +
          `╭───────────────◆\n` +
          `│⿻ *Title:* ${video.title}\n` +
          `│⿻ *Duration:* ${video.timestamp}\n` +
          `│⿻ *Views:* ${video.views.toLocaleString()}\n` +
          `│⿻ *Uploaded:* ${video.ago}\n` +
          `│⿻ *Channel:* ${video.author.name}\n` +
          `╰────────────────◆\n\n` +
          `🔗 ${video.url}`,
      };

      await zk.sendMessage(dest, message);
      console.log('Message sent with image and caption');

      await zk.sendMessage(dest, {
        video: { url: data.downloadLink },
        mimetype: 'video/mp4',
        fileName,
        caption: 'Video downloaded'
      });
      console.log('Video file sent');
    } catch (err) {
      console.error('[VIDEO] API Error:', err);
      if (err.response && err.response.status === 500) {
        await zk.sendMessage(dest, { text: 'The API is currently experiencing issues. Please try again later.' });
      } else {
        await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
      }
    }
  } catch (err) {
    console.error('[VIDEO] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
