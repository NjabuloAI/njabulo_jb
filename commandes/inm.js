const { fana } = require('../njabulo/fana');
var gis = require('g-i-s');

fana({
  nomCom: "im",
  categorie: "Search",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");

  gis(searchTerm, async (error, results) => {
    if (error) {
      repondre("Oops, an error occurred");
    } else {
      const picked = results.slice(0, 5);

      for (let i = 0; i < picked.length; i++) {
        zk.sendMessage(dest, {
          image: { url: picked[i].url },
          caption: `Image ${i + 1}`,
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "View Original",
                url: picked[i].url
              })
            }
          ]
        }, { quoted: ms });
      }
    }
  });
});
