const { fana } = require('../njabulo/fana');
const getFBInfo = require("@xaviabot/fb-downloader");

fana({
  nomCom: "fac",
  categorie: "Download",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  if (!arg[0]) {
    repondre('Insert a public Facebook video link!');
    return;
  }
  const queryURL = arg.join(" ");
  try {
    const result = await getFBInfo(queryURL);
    const caption = `Title: ${result.title}\nLink: ${result.url}`;
    const buttons = [
      {
        buttonId: "download_hd",
        buttonText: {
          displayText: "Download HD"
        }
      },
      {
        buttonId: "download_sd",
        buttonText: {
          displayText: "Download SD"
        }
      }
    ];
    await zk.sendMessage(dest, {
      image: { url: result.thumbnail },
      caption,
      buttons
    }, { quoted: ms });

    zk.on('button-press', async (button) => {
      if (button.id === 'download_hd') {
        await zk.sendMessage(dest, {
          video: { url: result.hd },
          caption: 'Downloaded using Njabulo-Md'
        }, { quoted: ms });
      } else if (button.id === 'download_sd') {
        await zk.sendMessage(dest, {
          video: { url: result.sd },
          caption: 'Downloaded using Njabulo-Md'
        }, { quoted: ms });
      }
    });
  } catch (error) {
    console.error('Error downloading video:', error);
    repondre('Try fbdl2 on this link or check the link validity');
  }
});
