const { fana } = require('../njabulo/fana');
const { downloadTiktok } = require("@mrnima/tiktok-downloader");

fana({
  nomCom: "tik",
  categorie: "Download",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Need url');
    return;
  }

  try {
    let result = await downloadTiktok(arg[0]);
    let text = `*TIKTOK DOWNLOADER*\n\n`;
    text += `*Title:* ${result.result.title}\n\n`;
    text += `*Download Options:*\n`;
    text += `1. SD Quality\n`;
    text += `2. HD Quality\n`;
    text += `3. Audio\n\n`;
    text += `Reply with the number of your preferred option`;

    repondre(text);

    zk.on('message', async (msg) => {
      if (msg.body === '1') {
        zk.sendMessage(dest, { video: { url: result.result.dl_link.download_mp4_1 } }, { quoted: ms });
      } else if (msg.body === '2') {
        zk.sendMessage(dest, { video: { url: result.result.dl_link.download_mp4_2 } }, { quoted: ms });
      } else if (msg.body === '3') {
        zk.sendMessage(dest, { audio: { url: result.result.dl_link.download_mp3 } }, { quoted: ms });
      }
    });
  } catch (error) {
    console.log(error);
    repondre('Error downloading video');
  }
});
