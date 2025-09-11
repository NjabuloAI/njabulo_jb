const { zokou } = require('../framework/zokou');
var gis = require('g-i-s');

zokou({
  nomCom: "img",
  categorie: "Search",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image? !');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, envoiImage);

  function envoiImage(e, r) {
    if (e) {
      repondre("Oops, an error occurred!");
    } else {
      let buttons = [];
      for (var a = 0; a < 5; a++) {
        buttons.push({
          buttonId: `viewimg_${a}`,
          buttonText: `View Image ${a + 1}`,
          type: 1
        });
      }

      zk.sendMessage(dest, {
        image: { url: r[0].url },
        caption: `Search results for ${searchTerm}`,
        footer: 'Select an image to view',
        buttons: buttons,
        headerType: 4
      }, { quoted: ms });
    }
  }
});
