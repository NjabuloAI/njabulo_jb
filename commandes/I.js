const { fana } = require('../njabulo/fana');
var gis = require('g-i-s');

fana({
  nomCom: "i",
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
      const carouselCards = await Promise.all(picked.map(async (item, index) => ({
        header: {
          title: `Image ${index + 1}`,
          hasMediaAttachment: true,
          imageMessage: {
            url: item.url
          }
        },
        body: {
          text: `Search: ${searchTerm}`
        },
        footer: {
          text: "View Original"
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "View Original",
                url: item.url
              })
            }
          ]
        }
      })));

      for (let i = 0; i < picked.length; i++) {
        zk.sendMessage(dest, {
          image: { url: picked[i].url },
          caption: `Image ${i + 1}\nView Original: ${picked[i].url}`,
          buttons: [
            {
              buttonId: `view-original-${i}`,
              buttonText: { displayText: 'View Original' },
              type: 1
            }
          ]
        }, { quoted: ms });
      }
    }
  });
});
