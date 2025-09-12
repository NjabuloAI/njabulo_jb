const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

fana({
  nomCom: "findsong",
  categorie: "music",
  reaction: "🎵"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  try {
    repondre(`Please send a video to identify the song`);

    zk.on('message', async (m) => {
      if (m.from === dest && m.message.videoMessage) {
        const video = await zk.downloadMediaMessage(m);
        repondre(`Do you want to identify the song from the video? Please respond with "yes" or "no"`);

        const confirmationListener = async (m) => {
          if (m.from === dest && m.body.toLowerCase() === 'yes') {
            zk.off('message', confirmationListener);
            await identifySong(video, repondre);
          } else if (m.from === dest && m.body.toLowerCase() === 'no') {
            zk.off('message', confirmationListener);
            repondre('Song identification cancelled');
          }
        };

        zk.on('message', confirmationListener);
      }
    });
  } catch (error) {
    console.error(error);
    repondre('An error occurred');
  }
});

async function identifySong(video, repondre) {
  try {
    const apiKey = 'YOUR_RAPIDAPI_KEY';
    const shazamApi = 'https://shazam.p.rapidapi.com/songs/detect';
    const audioFile = await extractAudioFromVideo(video);
    const formData = new FormData();
    formData.append('audio', fs.createReadStream(audioFile));

    const headers = {
      'X-RapidAPI-Key': apiKey,
      ...formData.getHeaders(),
    };

    const response = await axios.post(shazamApi, formData, { headers });
    const songName = response.data.track.title;
    const artist = response.data.track.subtitle;
    const youtubeChannel = `https://www.youtube.com/results?search_query=${songName}+${artist}`;

    repondre(`🎵 Song Name: ${songName}\n👨‍🎤 Artist: ${artist}\n📹 YouTube Channel: ${youtubeChannel}`);
  } catch (error) {
    console.error(error);
    repondre('Song not recognized');
  }
}

// Function to extract audio from video (you need to implement this)
async function extractAudioFromVideo(video) {
  // Your implementation here using a library like FFmpeg
  // For example:
  const ffmpeg = require('fluent-ffmpeg');
  const audioFile = 'audio.mp3';
  return new Promise((resolve, reject) => {
    ffmpeg(video)
      .setFormat('mp3')
      .save(audioFile)
      .on('end', () => {
        resolve(audioFile);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
    }
