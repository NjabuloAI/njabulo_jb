const { fana } = require('../njabulo/fana');
var gis = require('g-i-s');

fana({
  nomCom: "x",
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
        const buttons = [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "View Original",
              url: picked[i].url
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "PING",
              id: `.ping`
            })
          }
        ];

        const msg = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: {
                body: {
                  text: `Image ${i + 1}`
                },
                footer: {
                  text: "Image Footer"
                },
                header: {
                  hasMediaAttachment: true,
                  imageMessage: {
                    url: picked[i].url
                  }
                },
                nativeFlowMessage: {
                  buttons
                }
              }
            }
          }
        };

        zk.sendMessage(dest, msg, { quoted: ms });
      }
    }
  });
});
