const { fana } = require("../njabulo/fana");
const axios = require('axios');

fana({
  nomCom: "lyrics",
 3,
  aliases: ["lyrici"],
  categorie: "search",
  reaction: "📝"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    if (!arg) {
      return zk.sendMessage(dest, { text: 'Please provide a song name or artist.' });
    }

    const query = arg.join(' ');
    const apiURL = `https://api.lyrics.ovh/v1/${query}`;

    const response = await axios.get(apiURL);
    const data = response.data;

    if (!data.lyrics) {
      return zk.sendMessage(dest, { text: 'No lyrics found for your query.' });
    }

    const lyricsMessage = {
      text: `*${query}*\n\n${data.lyrics}`,
    };

    await zk.sendMessage(dest, lyricsMessage);
  } catch (err) {
    console.error('[LYRICS] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
